import { UserRepositoryInMemory } from '../__tests__/repository/UserRepositoryInMemory.js';
import { Token } from '../domain/entities/Token.js';
import { ApiError, UnauthorizedError } from '../domain/exceptions/Errors.js';
import { Either, left, right } from './exceptions/Either.js';

interface LoginPropsInput {
  email: string;
  password: string;
}

interface LoginPropsOutput {
  token: string;
  userId: string;
}

export class LoginUserUseCase {
  constructor(private repo: UserRepositoryInMemory) {}

  async execute(
    payload: LoginPropsInput,
  ): Promise<Either<ApiError, LoginPropsOutput>> {
    const user = await this.repo.findByEmail(payload.email);

    if (!user || payload.password !== user.password)
      return left(new UnauthorizedError('Invalid credentials.'));

    const token = new Token();

    return right({
      token: token.generate(user.id),
      userId: user.id,
    });
  }
}
