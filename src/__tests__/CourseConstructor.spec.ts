import { describe, expect, it } from 'vitest';

import Course from '../entities/course.js';

describe('Course constructor', () => {
  it('', async () => {
    const courseProps = {
      name: 'javascript',
      open: true,
    };
    const course = new Course(courseProps);

    expect(course.props.name).toBe(courseProps.name);
    expect(course.props.open).toBe(courseProps.open);
    expect(course.props.code).toBeTruthy();
  });
});
