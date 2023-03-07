import { UserRepositoryInMemory } from '../__tests__/repository/UserRepositoryInMemory.js';
import { UnauthorizedError } from '../domain/exceptions/Errors.js';

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

  async execute(payload: LoginPropsInput): Promise<LoginPropsOutput> {
    const user = await this.repo.findByEmail(payload.email);
    if (!user) throw new UnauthorizedError('Invalid credentials.');

    if (payload.password !== user.password)
      throw new UnauthorizedError('Invalid credentials.');

    return {
      token: '123',
      userId: user.id,
    };
  }
}
