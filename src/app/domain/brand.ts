import {Model} from './model';

export class Brand {
  id: number;
  name: string;
  model: Model;

  constructor(value: any) {
    Object.assign(this, value);
  }
}
