import { describe, expect, it } from 'vitest';

import Course from '../entities/course.js';
import { CourseInMemory } from '../infra/CourseInMemory.js';

describe('Course in memory tests', () => {
  it('Insert a new course', async () => {
    const courseProps = {
      name: 'javascript',
      open: true,
    };
    const course = new Course(courseProps);
    const repo = new CourseInMemory();

    await repo.insert(course);
    expect(repo.courses).toHaveLength(1);
    expect(repo.courses).toStrictEqual([course]);
  });
});
