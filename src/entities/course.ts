import { randomUUID } from 'crypto';

export interface CourseProps {
  name: string;
  open: boolean;
  code: string;
}

export default class Course {
  public props: CourseProps;

  constructor(props: Omit<CourseProps, 'code'>) {
    this.props = {
      ...props,
      code: randomUUID(),
    };
  }

  toJSON(): CourseProps {
    return this.props;
  }
}
