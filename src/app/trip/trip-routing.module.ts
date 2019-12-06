import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TripListComponent} from './trip-list/trip-list.component';
import {TripInfoComponent} from './trip-info/trip-info.component';
import {TripCreateComponent} from './trip-create/trip-create.component';
import {AddPassengerComponent} from './add-passenger/add-passenger.component';


const routes: Routes = [
  {path: 'list', component: TripListComponent},
  {path: 'detail/:id', component: TripInfoComponent},
  {path: 'create', component: TripCreateComponent},
  {path: 'add-passenger/:id', component: AddPassengerComponent},
  {path: '', redirectTo: '/home/home/trip/list', pathMatch: 'full'}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripRoutingModule { }
