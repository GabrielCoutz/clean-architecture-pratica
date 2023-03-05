import CourseRepository from '../repository/CourseRepository.js';

export default class AddCourse {
  constructor(public courseRepository: CourseRepository) {}

  async execute() {
    const course = await this.courseRepository.getCourseRepository('1');
    return course;
  }
}
