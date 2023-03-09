import { UserRepositoryInMemory } from '../__tests__/repository/UserRepositoryInMemory.js';
import {
  User,
  UserPropsInput,
  UserPropsOutput,
} from '../domain/entities/User.js';
import { ApiError, ConflictError } from '../domain/exceptions/Errors.js';
import { Either, left, right } from './exceptions/Either.js';

export class CreateUserUseCase {
  constructor(private repo: UserRepositoryInMemory) {}

  async execute(
    input: UserPropsInput,
  ): Promise<Either<ApiError, UserPropsOutput>> {
    const user = new User(input);

    if (await this.emailAlreadyInUse(input.email))
      return left(new ConflictError('Email already in use.'));

    await this.repo.execute(user);

    return right(user.toJSON());
  }

  private async emailAlreadyInUse(email: string): Promise<boolean> {
    return !!(await this.repo.findUserBy('email', email));
  }
}
