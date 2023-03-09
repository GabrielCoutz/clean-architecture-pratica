import { beforeAll, describe, expect, it } from 'vitest';

import { CreateUserUseCase } from '../../useCases/CreateUser.js';
import { DeleteUserUseCase } from '../../useCases/DeleteUser.js';
import { UserRepositoryInMemory } from '../repository/UserRepositoryInMemory.js';

describe('Delete user', () => {
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

  it('Should delete user and return true', async () => {
    const deleteUserUseCase = new DeleteUserUseCase(repo);

    const userId = repo.users[0].id; // this should come from bearer token in real life

    const output = await deleteUserUseCase.execute(userId);

    expect(output.isLeft()).toBeFalsy();
    expect(output.isRight()).toBeTruthy();
    expect(repo.users).toHaveLength(0);

    if (output.isRight()) expect(output.value).toBeTruthy();
  });

  it('should return status 404 with invalid userId', async () => {
    const deleteUserUseCase = new DeleteUserUseCase(repo);
    const output = await deleteUserUseCase.execute('any_userId');

    expect(output.isLeft()).toBeTruthy();
    expect(output.isRight()).toBeFalsy();

    if (output.isLeft()) expect(output.value.statusCode).toEqual(404);
  });
});
