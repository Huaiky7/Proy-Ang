import { Component, OnInit } from '@angular/core';
import {BrandService} from '../../service/brand.service';
import {BusService} from '../../service/bus.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ModelService} from '../../service/model.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Trip} from '../../domain/trip';
import {Person} from '../../domain/person';
import {Bus} from '../../domain/bus';
import {TripService} from '../../service/trip.service';

@Component({
  selector: 'app-trip-info',
  templateUrl: './trip-info.component.html',
  styleUrls: ['./trip-info.component.scss']
})
export class TripInfoComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private busService: BusService,
              private router: Router,
              private tripService: TripService) {}

  buses: Bus[];
  trip: Trip;
  tripForm: FormGroup;
  passengers: Person[];
  displayedColumns: string[] = ['firstname', 'lastname', 'age'];

  ngOnInit() {

    this.busService.findAll().subscribe(list => this.buses = list );
    this.tripForm = this.formBuilder.group({
      departure : ['', [Validators.required, Validators.maxLength(100)]],
      destination : ['', [Validators.required, Validators.maxLength(100)]],
      startDate : ['', Validators.required],
      endDate : ['', Validators.required],
      bus: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      this.tripService.findOne(+params.get('id')).subscribe(trip => {
        this.trip = trip;

        this.tripForm.patchValue({
          id: this.trip.id,
          departure: this.trip.departure,
          destination: this.trip.destination,
          startDate: new FormControl(new Date(this.trip.startDate * 1000)).value,
          endDate: new FormControl(new Date(this.trip.endDate * 1000)).value,
          bus: this.trip.bus
        });
        this.passengers = trip.passengers;
      });
    });
  }

  saveData() {
    this.tripService.update(
      this.trip.id,
      this.tripForm.getRawValue().departure,
      this.tripForm.getRawValue().destination,
      +new Date(this.tripForm.getRawValue().startDate) / 1000,
      +new Date(this.tripForm.getRawValue().endDate) / 1000,
      this.tripForm.getRawValue().bus,
      this.passengers)

      .subscribe(trip => {
        this.router.navigate(['home/home/trip/list']);
      });
  }
}
