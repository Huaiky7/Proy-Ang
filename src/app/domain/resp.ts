export class Resp {
  token: string;

  constructor(value: any) {
    Object.assign(this, value);
  }
}
