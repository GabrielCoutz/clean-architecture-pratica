import { UnauthorizedError } from '../domain/exceptions/Errors.js';
import { Either } from '../useCases/exceptions/Either.js';

export interface TokenAcess {
  generate(token: string): string;
  verify(token: string): Either<UnauthorizedError, string>;
}
