import { User, UserPropsInput, UserPropsOutput } from '../entities/User.js';
import { UserRepositoryInMemory } from '../infra/UserRepositoryInMemory.js';

export class CreateUserUseCase {
  constructor(private repo: UserRepositoryInMemory) {}

  async execute(input: UserPropsInput): Promise<UserPropsOutput> {
    const user = new User(input);

    if (await this.emailAlreadyInUse(input.email))
      throw new Error('Email already in use');

    await this.repo.execute(user);

    return user.toJSON();
  }

  private async emailAlreadyInUse(email: string): Promise<boolean> {
    const result = await this.repo.findByEmail(email);
    return !!result;
  }
}
