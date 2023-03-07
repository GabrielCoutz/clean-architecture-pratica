import { User, UserPropsOutput } from '../entities/User.js';

export class UserRepositoryInMemory {
  users: UserPropsOutput[] = [];

  async execute(user: User): Promise<void> {
    this.users.push(user.toJSON());
  }
}
