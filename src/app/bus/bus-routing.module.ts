import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BusListComponent} from './bus-list/bus-list.component';
import {BusCreateComponent} from './bus-create/bus-create.component';
import {PersonInfoComponent} from '../person/person-info/person-info.component';
import {BusInfoComponent} from './bus-info/bus-info.component';

const routes: Routes = [
  {path: 'list', component: BusListComponent},
  {path: 'create', component: BusCreateComponent},
  {path: 'detail/:id', component: BusInfoComponent},
  {path: '', redirectTo: '/home/home/bus/list', pathMatch: 'full'}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusRoutingModule { }
