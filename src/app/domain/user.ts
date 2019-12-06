export class User {
  userName: string;

  constructor(value: any) {
    Object.assign(this, value);
  }
}
