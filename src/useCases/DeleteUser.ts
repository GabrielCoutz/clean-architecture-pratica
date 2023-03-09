import { UserRepository } from '../gateways/UserRepository.js';

export class DeleteUserUseCase {
  constructor(private repo: UserRepository) {}

  async execute(userId: string) {
    const user = await this.repo.findByEmail
  }
}
