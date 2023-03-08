import { beforeAll, describe, expect, it } from 'vitest';

import { CreateUserUseCase } from '../../useCases/CreateUser.js';
import {
  UpdateUserProps,
  UpdateUserUseCase,
} from '../../useCases/UpdateUser.js';
import { UserRepositoryInMemory } from '../repository/UserRepositoryInMemory.js';

describe('Update user tests', () => {
  const repo = new UserRepositoryInMemory();
  const userData = {
    firstName: 'firstName',
    lastName: 'secondName',
    email: 'user@example.com',
    password: 'password',
  };

  beforeAll(async () => {
    const createUserUseCase = new CreateUserUseCase(repo);
    await createUserUseCase.execute(userData);
  });

  it('Should update user and return new data', async () => {
    const updateUserUseCase = new UpdateUserUseCase(repo);
    const newInfo: UpdateUserProps = {
      firstName: 'updated',
      lastName: 'updated',
      email: 'user@example.com',
      password: 'updated',
      userName: 'updated',
    };
    const userId = repo.users[0].id; // this should come from bearer token in real life

    const output = await updateUserUseCase.execute(userId, newInfo);

    expect(output.isLeft()).toBeFalsy();
    expect(output.isRight()).toBeTruthy();

    if (output.isRight()) {
      expect(output.value.email).toEqual(newInfo.email);
      expect(output.value.firstName).toEqual(newInfo.firstName);
      expect(output.value.lastName).toEqual(newInfo.lastName);
      expect(output.value.password).toEqual(newInfo.password);
      expect(output.value.userName).toEqual(newInfo.userName);
    }
  });

  it('should return status 401 with invalid credentials', async () => {
    const updateUserUseCase = new UpdateUserUseCase(repo);
    const output = await updateUserUseCase.execute('any_userId', userData);

    expect(output.isLeft()).toBeTruthy();
    expect(output.isRight()).toBeFalsy();

    if (output.isLeft()) expect(output.value.statusCode).toEqual(401);
  });

  it('should return status 404 with invalid userId and random user data', async () => {
    const updateUserUseCase = new UpdateUserUseCase(repo);
    const output = await updateUserUseCase.execute('any_userId', {});

    expect(output.isLeft()).toBeTruthy();
    expect(output.isRight()).toBeFalsy();

    if (output.isLeft()) expect(output.value.statusCode).toEqual(404);
  });
});
