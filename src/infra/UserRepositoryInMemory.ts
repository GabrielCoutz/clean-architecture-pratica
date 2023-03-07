import { User, UserPropsOutput } from '../entities/User.js';
import { UserRepository } from './UserRepository.js';

export class UserRepositoryInMemory implements UserRepository {
  users: UserPropsOutput[] = [];

  async execute(user: User): Promise<void> {
    this.users.push(user.toJSON());
  }

  findByEmail(userEmail: string): Promise<UserPropsOutput | undefined> {
    const result = this.users.find((user) => user.email === userEmail);

    return Promise.resolve(result);
  }
}
