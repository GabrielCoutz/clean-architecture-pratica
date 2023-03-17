import { UserRepositoryInMemory } from '../__tests__/repository/UserRepositoryInMemory.js';
import { UserPropsOutput } from '../domain/entities/User.js';
import { ApiError, NotFoundError } from '../domain/exceptions/Errors.js';
import { Either, left, right } from './exceptions/Either.js';

export class GetUserUseCase {
  constructor(private readonly repo: UserRepositoryInMemory) {}

  async execute(userId: string): Promise<Either<ApiError, UserPropsOutput>> {
    const user = await this.repo.findUserBy('id', userId);

    if (!user) return left(new NotFoundError('User not found'));

    return right(user);
  }
}
