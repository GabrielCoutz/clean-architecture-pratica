import { randomUUID } from 'crypto';

export interface UserPropsInput {
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
}
export interface UserPropsOutput extends UserPropsInput {
  readonly id: string;
  readonly userName: string;
}

export class User {
  public userName: string;

  constructor(private props: UserPropsInput) {
    this.userName = `${this.props.firstName.split(' ')[0]}.${
      this.props.lastName.split(' ')[0]
    }`;
  }

  toJSON(): UserPropsOutput {
    return {
      ...this.props,
      userName: this.userName,
      id: randomUUID(),
    };
  }
}
