import { describe, expect, it } from 'vitest';

import { JwtToken } from '../../domain/entities/JwtToken.js';

describe('JwtToken', () => {
  it('Should create and return JWT', () => {
    const tokenCreator = new JwtToken();
    const token = tokenCreator.generate('123');

    expect(token).toBeTypeOf('string');
  });

  it('Should return id with valid token', () => {
    const tokenCreator = new JwtToken();
    const fakeId = '123';

    const token = tokenCreator.generate(fakeId);
    const output = tokenCreator.verify(token);

    expect(output.isLeft()).toBeFalsy();
    expect(output.isRight()).toBeTruthy();

    expect(output.value).toEqual(fakeId);
  });

  it('Should return status 401 with invalid token', () => {
    const tokenCreator = new JwtToken();
    const fakeId = '123';

    const token = tokenCreator.generate(fakeId);
    const invalidToken = token.substring(0, token.length - 3) + 'abc';

    const output = tokenCreator.verify(invalidToken);

    expect(output.isLeft()).toBeTruthy();
    expect(output.isRight()).toBeFalsy();

    if (output.isLeft()) expect(output.value.statusCode).toEqual(401);
  });
});
