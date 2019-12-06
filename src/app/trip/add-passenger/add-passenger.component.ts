import { Component, OnInit } from '@angular/core';
import {PersonService} from '../../service/person.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TripService} from '../../service/trip.service';
import {Person} from '../../domain/person';
import {Trip} from '../../domain/trip';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-add-passenger',
  templateUrl: './add-passenger.component.html',
  styleUrls: ['./add-passenger.component.scss']
})
export class AddPassengerComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private router: Router,
    private tripService: TripService) { }

  passenger: Person;
  passengers: Person[];
  persons: Person[];
  trip: Trip;
  passengerCtrl = new FormControl();
  filteredPassenger: Observable<Person[]>;
  displayedColumns: string[] = ['firstname', 'lastname', 'age'];
  disabled: boolean;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.tripService.findOne(+params.get('id')).subscribe(trip => {
        this.trip = trip;
        this.passengers = trip.passengers;
        if (this.passengers.length >= this.trip.bus.numberOfSeats){
          this.passengerCtrl.disable();
          this.disabled = true;
        }
        });
    });
    this.personService.findAll().subscribe(list => this.persons = list );

    this.filteredPassenger = this.passengerCtrl.valueChanges
      .pipe(
        startWith(''),
        map(passenger => passenger ? this._filteredPassenger(passenger) : this.persons)
      );

  }

  private _filteredPassenger(value: string): Person[] {
    const filterValue = value.toLowerCase();

    return this.persons.filter(passenger => passenger.showName().toLowerCase().indexOf(filterValue) === 0);
  }

  saveData() {
    this.passenger = this.persons.filter(passenger =>
      passenger.showName()
        .toLowerCase()
        .indexOf(this.passengerCtrl.value.toLowerCase()) === 0)[0];

    this.trip.addPassenger(this.passenger);

    this.tripService.update(
      this.trip.id,
      this.trip.departure,
      this.trip.destination,
      this.trip.startDate,
      this.trip.endDate,
      this.trip.bus,
      this.trip.passengers).subscribe( next => {
        this.tripService.findOne(this.trip.id).subscribe(trip => {
          this.trip = trip;
          this.passengers = trip.passengers;
          if (this.passengers.length >= this.trip.bus.numberOfSeats){
            this.passengerCtrl.disable();
            this.disabled = true;
          }
        });
      });
    }
}
