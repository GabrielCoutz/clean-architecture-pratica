import { UserRepositoryInMemory } from '../__tests__/repository/UserRepositoryInMemory.js';
import {
  ApiError,
  NotFoundError,
  UnauthorizedError,
} from '../domain/exceptions/Errors.js';
import { Either, left, right } from './exceptions/Either.js';

export interface UpdateUserProps {
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly userName: string;
}

export class UpdateUserUseCase {
  constructor(private readonly repo: UserRepositoryInMemory) {}

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
