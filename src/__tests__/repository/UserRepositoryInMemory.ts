import { User, UserPropsOutput } from '../../domain/entities/User.js';
import { UserRepository } from '../../gateways/UserRepository.js';
import { UpdateUserProps } from '../../useCases/UpdateUser.js';

export class UserRepositoryInMemory implements UserRepository {
  users: UserPropsOutput[] = [];

  async execute(user: User): Promise<void> {
    this.users.push(user.toJSON());
  }

  async findByEmail(userEmail: string): Promise<UserPropsOutput | undefined> {
    const result = this.users.find((user) => user.email === userEmail);

    return result;
  }

  async updateUser(
    userId: string,
    payload: Partial<UpdateUserProps>,
  ): Promise<Partial<UpdateUserProps>> {
    const userIndex = this.users.findIndex(
      (userInMemory) => userInMemory.id === userId,
    );
    this.users[userIndex] = {
      ...(payload as UserPropsOutput), // just for in memory usage
      id: this.users[userIndex].id,
    };

    return payload;
  }
}
