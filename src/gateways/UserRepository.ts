import { UserPropsOutput } from '../domain/entities/User.js';
import { UpdateUserProps } from '../useCases/UpdateUser.js';

export interface UserRepository {
  findByEmail(userEmail: string): Promise<UserPropsOutput | undefined>;
  updateUser(
    userId: string,
    payload: Partial<UpdateUserProps>,
  ): Promise<Partial<UpdateUserProps>>;
}
