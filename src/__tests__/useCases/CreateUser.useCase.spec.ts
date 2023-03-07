import { describe, expect, it } from 'vitest';

import { UserRepositoryInMemory } from '../../infra/UserRepositoryInMemory.js';
import { CreateUserUseCase } from '../../useCases/CreateUser.js';

describe('Create user with use case', () => {
  it('Should create user and save it', async () => {
    const info = {
      firstName: 'firstName secondName',
      lastName: 'lastName',
      email: 'example@gmail.com',
      password: 'password',
    };
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
});
