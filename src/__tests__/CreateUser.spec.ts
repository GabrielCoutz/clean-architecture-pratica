import { describe, expect, it } from 'vitest';

import { User } from '../entities/User.js';

describe('Create user', () => {
  it('Should create and returns user props', () => {
    const info = {
      firstName: 'gabriel',
      lastName: 'coutz',
      email: 'gabriel@gmail.com',
      password: 'password',
    };

    const user = new User(info);
    const output = user.toJSON();

    expect(output.firstName).toBe('gabriel');
    expect(output.lastName).toBe('coutz');
    expect(output.userName).toBe('gabriel.coutz');
    expect(output.email).toBe('gabriel@gmail.com');
    expect(output.password).toBe('password');
  });
});
