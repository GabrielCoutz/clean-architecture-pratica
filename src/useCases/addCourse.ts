import Course from '../entities/course.js';
import CourseRepository from '../entities/CourseRepository.js';

interface AddCourseInput {
  name: string;
  open: boolean;
}

interface AddCourseOutput {
  name: string;
  open: boolean;
  code: string;
}

export default class AddCourse {
  constructor(private routerRepo: CourseRepository) {}

  async execute(input: AddCourseInput): Promise<AddCourseOutput> {
    const course = new Course(input);
    await this.routerRepo.insert(course);

    return course.props;
  }
}
