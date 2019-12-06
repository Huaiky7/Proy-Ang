import { Component, OnInit } from '@angular/core';
import {BusService} from '../../service/bus.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TripService} from '../../service/trip.service';
import {Person} from '../../domain/person';
import {Trip} from '../../domain/trip';
import {Bus} from '../../domain/bus';
import {ArrayType} from '@angular/compiler';
import {of} from 'rxjs';

@Component({
  selector: 'app-trip-create',
  templateUrl: './trip-create.component.html',
  styleUrls: ['./trip-create.component.scss']
})
export class TripCreateComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private busService: BusService,
              private router: Router,
              private tripService: TripService) {}

  buses: Bus[];
  tripForm: FormGroup;
  passengers: Person[] = [];

  ngOnInit() {

    this.busService.findAll().subscribe(list => this.buses = list );
    this.tripForm = this.formBuilder.group({
      departure : ['', [Validators.required, Validators.maxLength(100)]],
      destination : ['', [Validators.required, Validators.maxLength(100)]],
      startDate : ['', Validators.required],
      endDate : ['', Validators.required],
      bus: ['', Validators.required]
    });
  }

  saveData() {
    this.tripService.create(
      this.tripForm.getRawValue().departure,
      this.tripForm.getRawValue().destination,
      +new Date(this.tripForm.getRawValue().startDate) / 1000,
      +new Date(this.tripForm.getRawValue().endDate) / 1000,
      this.tripForm.getRawValue().bus,
      this.passengers);

    this.router.navigate(['home/home/trip/list']);

  }
}
