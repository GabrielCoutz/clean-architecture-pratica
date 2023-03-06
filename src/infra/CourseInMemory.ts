import Course from '../entities/course.js';
import CourseRepository from '../entities/CourseRepository.js';

export class CourseInMemory implements CourseRepository {
  public courses: Course[] = [];

  async insert(route: Course): Promise<void> {
    this.courses.push(route);
  }
}
