import { describe, expect, it } from 'vitest';

import CourseRepositoryInMemory from '../infra/CourseRepositoryInMemory.js';
import AddCourse from '../useCases/addCourse.js';

describe('', () => {
  it('', async () => {
    const courseRepositoryinMemory = new CourseRepositoryInMemory();
    const courseToAdd = new AddCourse(courseRepositoryinMemory);

    // expect(course.name).toBe('javascript');
  });
});
