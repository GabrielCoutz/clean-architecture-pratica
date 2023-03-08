import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import { TokenAcess } from '../../gateways/TokenAcess.js';
import { Either, left, right } from '../../useCases/exceptions/Either.js';
import { UnauthorizedError } from '../exceptions/Errors.js';

dotenv.config();

export class Token implements TokenAcess {
  generate(id: string): string {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
  }

  verify(token: string): Either<UnauthorizedError, string> {
    const output = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof output === 'object') return right(output.id);
    return left(new UnauthorizedError('User not logged in.'));
  }
}
