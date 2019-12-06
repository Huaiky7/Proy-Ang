import {Model} from './model';

export class Bus {
  id: number;
  licensePlate: string;
  model: Model;
  numberOfSeats: number;

  constructor(value: any) {
    Object.assign(this, value);
  }

  public detail(): string {
    return this.licensePlate + ' ' + this.model.brand.name + ' ' + this.model.name;
  }
}
