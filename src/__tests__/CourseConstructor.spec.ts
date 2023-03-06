import { describe, expect, it } from 'vitest';

import Course from '../entities/course.js';

describe('Course constructor', () => {
  it('Return course created', async () => {
    const courseProps = {
      name: 'javascript',
      open: true,
    };

    const course = new Course(courseProps);
    const output = course.toJSON();

    expect(output.name).toBe(courseProps.name);
    expect(output.open).toBe(courseProps.open);
    expect(output.code).toBeTruthy();
  });
});
