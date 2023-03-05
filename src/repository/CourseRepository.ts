import Course from '../entities/course.js';

export default interface CourseRepository {
  getCourseRepository(code: string): Promise<Course>;
  addCourseToRepository(course: Course): Promise<Course>;
  // eslint-disable-next-line semi
}
