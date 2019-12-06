import {Bus} from './bus';
import {Person} from './person';

export class Trip {
  id:	number;
  departure:	string;
  destination:	string;
  bus:	Bus;
  passengers: Person[];
  startDate:	number;
  endDate:	number;

  constructor(value: any) {
    Object.assign(this, value);
  }

  addPassenger(passenger: Person): void {
    this.passengers.push(passenger);
  }
}
