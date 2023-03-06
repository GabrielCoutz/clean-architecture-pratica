import Course from './course.js';

export default interface CourseRepository {
  insert(route: Course): Promise<void>;
  // eslint-disable-next-line semi, prettier/prettier
};
