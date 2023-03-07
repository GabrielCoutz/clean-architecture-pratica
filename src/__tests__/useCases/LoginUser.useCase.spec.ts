import { beforeAll, describe, expect, it } from 'vitest';

import { CreateUserUseCase } from '../../useCases/CreateUser.js';
import { LoginUserUseCase } from '../../useCases/LoginUser.js';
import { UserRepositoryInMemory } from '../repository/UserRepositoryInMemory.js';

describe('Login user', () => {
  const repo = new UserRepositoryInMemory();

  beforeAll(() => {
    const info = {
      firstName: 'firstName',
      lastName: 'secondName',
      email: 'user@example.com',
      password: 'password',
    };
    const createUserUseCase = new CreateUserUseCase(repo);
    createUserUseCase.execute(info);
  });

  it('Should login user and returns token', async () => {
    const user = {
      email: 'user@example.com',
      password: 'password',
    };

    const loginUserUseCase = new LoginUserUseCase(repo);
    const output = await loginUserUseCase.execute(user);

    expect(output.token).toBeDefined();
    expect(output.userId).toBeDefined();
  });

  it('Should return error with invalid credentials', async () => {
    const loginUserUseCase = new LoginUserUseCase(repo);

    try {
      await loginUserUseCase.execute({
        email: 'anyEmail@example.com',
        password: 'anyPassword',
      });
    } catch (error) {
      expect(error.statusCode).toBe(401);
    }
  });
});
