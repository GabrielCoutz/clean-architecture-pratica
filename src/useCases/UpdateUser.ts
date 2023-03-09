import { UserRepositoryInMemory } from '../__tests__/repository/UserRepositoryInMemory.js';
import {
  ApiError,
  NotFoundError,
  UnauthorizedError,
} from '../domain/exceptions/Errors.js';
import { Either, left, right } from './exceptions/Either.js';

export interface UpdateUserProps {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userName: string;
}

export class UpdateUserUseCase {
  constructor(private repo: UserRepositoryInMemory) {}

  async execute(
    userId: string,
    payload: Partial<UpdateUserProps>,
  ): Promise<Either<ApiError, Partial<UpdateUserProps>>> {
    const user = await this.repo.findUserBy('email', payload.email);
    if (!user) return left(new NotFoundError('User not Found'));

    if (userId !== user.id)
      return left(
        new UnauthorizedError('You cannot change data from others users'),
      );

    await this.repo.updateUser(userId, payload);

    return right(payload);
  }
}
