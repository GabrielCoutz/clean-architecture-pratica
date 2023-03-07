import { UserRepositoryInMemory } from '../__tests__/repository/UserRepositoryInMemory.js';
import {
  User,
  UserPropsInput,
  UserPropsOutput,
} from '../domain/entities/User.js';
import { ConflictError } from '../domain/exceptions/Errors.js';

export class CreateUserUseCase {
  constructor(private repo: UserRepositoryInMemory) {}

  async execute(input: UserPropsInput): Promise<UserPropsOutput> {
    const user = new User(input);

    if (await this.emailAlreadyInUse(input.email))
      throw new ConflictError('Email already in use.');

    await this.repo.execute(user);

    return user.toJSON();
  }

  private async emailAlreadyInUse(email: string): Promise<boolean> {
    const result = await this.repo.findByEmail(email);
    return !!result;
  }
}
