import { beforeAll, describe, expect, it } from 'vitest';

import { CreateUserUseCase } from '../../useCases/CreateUser.js';
import { LoginUserUseCase } from '../../useCases/LoginUser.js';
import { UserRepositoryInMemory } from '../repository/UserRepositoryInMemory.js';

describe('Login user', () => {
  const repo = new UserRepositoryInMemory();

  beforeAll(async () => {
    const info = {
      firstName: 'firstName',
      lastName: 'secondName',
      email: 'user@example.com',
      password: 'password',
    };
    const createUserUseCase = new CreateUserUseCase(repo);
    await createUserUseCase.execute(info);
  });

  it('Should login user and returns token', async () => {
    const user = {
      email: 'user@example.com',
      password: 'password',
    };

    const loginUserUseCase = new LoginUserUseCase(repo);
    const output = await loginUserUseCase.execute(user);

    expect(output.isLeft()).toBeFalsy();
    expect(output.isRight()).toBeTruthy();

    if (output.isRight()) {
      expect(output.value.token).toBeTypeOf('string');
      expect(output.value.userId).toBeDefined();
    }
  });

  it('Should return status 401 with invalid credentials', async () => {
    const loginUserUseCase = new LoginUserUseCase(repo);

    const output = await loginUserUseCase.execute({
      email: 'anyEmail@example.com',
      password: 'anyPassword',
    });

    expect(output.isLeft()).toBeTruthy();
    expect(output.isRight()).toBeFalsy();

    if (output.isLeft()) {
      expect(output.value.statusCode).toEqual(401);
    }
  });
});
