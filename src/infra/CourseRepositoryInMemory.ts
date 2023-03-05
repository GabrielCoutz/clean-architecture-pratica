import Course from '../entities/course.js';
import CourseRepository from '../repository/CourseRepository.js';

export default class CourseRepositoryInMemory implements CourseRepository {
  private repositoryInMemory: Course[] = [];

  getCourseRepository(code: string): Promise<Course> {
    return Promise.resolve(
      this.repositoryInMemory.filter((course) => course.code === code)[0],
    );
  }

  addCourseToRepository(course: Course): Promise<Course> {
    this.repositoryInMemory.push(course);
    return Promise.resolve(course);
  }
}
