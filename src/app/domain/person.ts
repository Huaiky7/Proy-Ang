export class Person {
  id: number;
  firstName: string;
  lastName: string;
  age: number;

  constructor(value: any) {
    Object.assign(this, value);
  }

  public showName(): string {
    return this.firstName + ' ' + this.lastName;
  }
}
