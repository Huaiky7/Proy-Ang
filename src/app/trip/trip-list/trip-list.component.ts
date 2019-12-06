import { Component, OnInit } from '@angular/core';
import {BusService} from '../../service/bus.service';
import {Router} from '@angular/router';
import {TripService} from '../../service/trip.service';
import {Bus} from '../../domain/bus';
import {Trip} from '../../domain/trip';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {

  constructor(
    private router: Router,
    private tripService: TripService) { }

  trips: Trip[];
  displayedColumns: string[] = ['departure', 'destination', 'bus', 'startDate', 'endDate', 'options'];

  ngOnInit() {
    this.tripService.findAll().subscribe(list => this.trips = list );
  }

  goDetail(t: Trip): void {
    this.router.navigate(['/home/home/trip/detail', t.id]);
  }

  addPassenger(t: Trip): void {
    this.router.navigate(['/home/home/trip/add-passenger', t.id]);
  }

  addNew() {
    this.router.navigate(['/home/home/trip/create']);
  }
}
