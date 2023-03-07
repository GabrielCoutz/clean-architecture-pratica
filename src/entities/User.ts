interface UserPropsInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
interface UserPropsOutput extends UserPropsInput {
  userName: string;
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
    };
  }
}
