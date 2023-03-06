import { describe, expect, it } from 'vitest';

import { CourseInMemory } from '../infra/CourseInMemory.js';
import AddCourse from '../useCases/addCourse.js';

describe('Add new coruse', () => {
  it('', async () => {
    const repo = new CourseInMemory();

    const addCourseUseCase = new AddCourse(repo);
    const output = await addCourseUseCase.execute({
      name: 'javascript',
      open: true,
    });

    expect(repo.courses).toHaveLength(1);
    expect(output).toStrictEqual(output);
  });
});
