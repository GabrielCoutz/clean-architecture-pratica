import { UserPropsOutput } from '../entities/User.js';

export interface UserRepository {
  findByEmail(userEmail: string): Promise<UserPropsOutput | undefined>;
}
