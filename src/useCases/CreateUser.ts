import { User, UserPropsInput, UserPropsOutput } from '../entities/User.js';
import { UserRepositoryInMemory } from '../infra/UserRepositoryInMemory.js';

export class CreateUserUseCase {
  constructor(private repo: UserRepositoryInMemory) {}

  async execute(input: UserPropsInput): Promise<UserPropsOutput> {
    const user = new User(input);

    await this.repo.execute(user);

    return user.toJSON();
  }
}
