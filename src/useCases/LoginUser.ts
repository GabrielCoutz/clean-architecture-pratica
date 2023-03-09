import { UserRepositoryInMemory } from '../__tests__/repository/UserRepositoryInMemory.js';
import { ApiError, UnauthorizedError } from '../domain/exceptions/Errors.js';
import { Authentication } from '../gateways/Authentication.js';
import { Either, left, right } from './exceptions/Either.js';

interface LoginPropsInput {
  readonly email: string;
  readonly password: string;
}

interface LoginPropsOutput {
  readonly token: string;
  readonly userId: string;
}

export class LoginUserUseCase {
  constructor(
    private readonly repo: UserRepositoryInMemory,
    private readonly token: Authentication,
  ) {}

  async execute(
    payload: LoginPropsInput,
  ): Promise<Either<ApiError, LoginPropsOutput>> {
    const user = await this.repo.findUserBy('email', payload.email);

    if (!user || payload.password !== user.password)
      return left(new UnauthorizedError('Invalid credentials.'));

    return right({
      token: this.token.generate(user.id),
      userId: user.id,
    });
  }
}
