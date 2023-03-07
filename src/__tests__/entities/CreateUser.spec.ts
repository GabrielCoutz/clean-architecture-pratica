import { describe, expect, it } from 'vitest';

import { User } from '../../domain/entities/User.js';

describe('Create user constructor', () => {
  it('Should create and returns user props', () => {
    const info = {
      firstName: 'gabriel',
      lastName: 'coutz',
      email: 'gabriel@gmail.com',
      password: 'password',
    };

    const user = new User(info);
    const output = user.toJSON();

    expect(output.id).toBeDefined();
    expect(output.firstName).toBe(info.firstName);
    expect(output.lastName).toBe(info.lastName);
    expect(output.userName).toBe('gabriel.coutz');
    expect(output.email).toBe(info.email);
    expect(output.password).toBeDefined();
  });
});
