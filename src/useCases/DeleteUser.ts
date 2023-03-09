import { ApiError, NotFoundError } from '../domain/exceptions/Errors.js';
import { UserRepository } from '../gateways/UserRepository.js';
import { Either, left, right } from './exceptions/Either.js';

export class DeleteUserUseCase {
  constructor(private readonly repo: UserRepository) {}

  async execute(userId: string): Promise<Either<ApiError, boolean>> {
    const user = await this.repo.findUserBy('id', userId);

    if (!user) return left(new NotFoundError('User not found.'));

    const result = await this.repo.deleteUser(userId);

    return right(result);
  }
}
