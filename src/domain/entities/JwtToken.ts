import dotenv from 'dotenv';
import jwt, { VerifyErrors } from 'jsonwebtoken';

import { Authentication } from '../../gateways/Authentication.js';
import { Either, left, right } from '../../useCases/exceptions/Either.js';
import { UnauthorizedError } from '../exceptions/Errors.js';

dotenv.config();

type TokenPayload = { id: string };

export class JwtToken implements Authentication {
  generate(id: string): string {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
  }

  verify(token: string): Either<UnauthorizedError, string> {
    let erro = false;
    let output: TokenPayload | undefined;

    jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err: VerifyErrors, decoded: TokenPayload) => {
        if (err) erro = true;
        output = decoded;
      },
    );

    if (erro) return left(new UnauthorizedError('User is not logged in.'));
    return right(output.id);
  }
}
