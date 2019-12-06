import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BusService} from '../../service/bus.service';
import {Bus} from '../../domain/bus';
import {Person} from '../../domain/person';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.scss']
})
export class BusListComponent implements OnInit {

  constructor(private busService: BusService, private router: Router) { }

  buses: Bus[];
  displayedColumns: string[] = ['licenseplate', 'brand', 'model', 'numberofseats', 'options'];

  ngOnInit() {
    this.busService.findAll().subscribe(list => this.buses = list );
  }

  goDetail(b: Bus): void {
    this.router.navigate(['/home/home/bus/detail', b.id]);
  }

  addNew() {
    this.router.navigate(['/home/home/bus/create']);
  }
}
