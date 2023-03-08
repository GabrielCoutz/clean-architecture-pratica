import { describe, expect, it } from 'vitest';

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

    expect(output.isLeft()).toBeFalsy();
    expect(output.isRight()).toBeTruthy();

    if (output.isRight()) {
      expect(output.value.id).toBeDefined();
      expect(output.value.firstName).toBe(info.firstName);
      expect(output.value.lastName).toBe(info.lastName);
      expect(output.value.userName).toBe('firstName.lastName');
      expect(output.value.email).toBe(info.email);
      expect(output.value.password).toBeDefined();
    }

    expect(repo.users).toHaveLength(1);
  });

  it('Should throw if email already in use', async () => {
    const repo = new UserRepositoryInMemory();
    const createUserUseCase = new CreateUserUseCase(repo);

    await createUserUseCase.execute(info);
    const output = await createUserUseCase.execute(info);

    expect(output.isLeft()).toBeTruthy();
    expect(output.isRight()).toBeFalsy();

    if (output.isLeft()) expect(output.value.statusCode).toEqual(409);
  });
});
