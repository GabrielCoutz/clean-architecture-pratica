import { describe, expect, it } from 'vitest';

import { ConflictError } from '../../domain/exceptions/Errors.js';
import { CreateUserUseCase } from '../../useCases/CreateUser.js';
import { UserRepositoryInMemory } from '../repository/UserRepositoryInMemory.js';

const info = {
  firstName: 'firstName secondName',
  lastName: 'lastName',
  email: 'example@gmail.com',
  password: 'password',
};

describe('Create user with use case', () => {
  it('Should create user and save it', async () => {
    const repo = new UserRepositoryInMemory();
    const createUserUseCase = new CreateUserUseCase(repo);

    const output = await createUserUseCase.execute(info);

    expect(output.id).toBeDefined();
    expect(output.firstName).toBe(info.firstName);
    expect(output.lastName).toBe(info.lastName);
    expect(output.userName).toBe('firstName.lastName');
    expect(output.email).toBe(info.email);
    expect(output.password).toBeDefined();

    expect(repo.users).toHaveLength(1);
  });

  it('Should throw if email already in use', async () => {
    const repo = new UserRepositoryInMemory();
    const createUserUseCase = new CreateUserUseCase(repo);

    await createUserUseCase.execute(info);

    try {
      await createUserUseCase.execute(info);
    } catch (err) {
      expect(err.statusCode).toBe(409);
    }
  });
});
