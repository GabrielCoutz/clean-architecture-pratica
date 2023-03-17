import { beforeAll, describe, expect, it } from 'vitest';

import { UserPropsOutput } from '../../domain/entities/User.js';
import { CreateUserUseCase } from '../../useCases/CreateUser.js';
import { GetUserUseCase } from '../../useCases/GetUser.js';
import { UserRepositoryInMemory } from '../repository/UserRepositoryInMemory.js';

describe('Get user', () => {
  let user: UserPropsOutput;
  const repo = new UserRepositoryInMemory();

  beforeAll(async () => {
    const createUserUseCase = new CreateUserUseCase(repo);
    const info = {
      firstName: 'firstName secondName',
      lastName: 'lastName',
      email: 'example@gmail.com',
      password: 'password',
    };
    const output = await createUserUseCase.execute(info);

    if (output.isRight()) user = output.value;
  });

  it('Should return an user', async () => {
    const getUserUseCase = new GetUserUseCase(repo);

    const output = await getUserUseCase.execute(repo.users[0].id);

    expect(output.isLeft()).toBeFalsy();
    expect(output.isRight()).toBeTruthy();

    if (output.isRight()) {
      expect(output.value.email).toEqual(user.email);
      expect(output.value.firstName).toEqual(user.firstName);
      expect(output.value.lastName).toEqual(user.lastName);
      expect(output.value.userName).toEqual(user.userName);
    }
  });

  it('Should return an 404 error', async () => {
    const getUserUseCase = new GetUserUseCase(repo);

    const output = await getUserUseCase.execute('any_user_id');

    expect(output.isLeft()).toBeTruthy();
    expect(output.isRight()).toBeFalsy();

    if (output.isLeft()) expect(output.value.statusCode).toEqual(404);
  });
});
