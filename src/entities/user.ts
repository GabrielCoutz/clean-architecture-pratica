interface IUser {
  userName: string;
  email: string;
  password: string;
}

export class User {
  constructor(public props: IUser) {}
}
