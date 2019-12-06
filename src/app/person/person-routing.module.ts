import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PersonListComponent} from './person-list/person-list.component';
import {PersonInfoComponent} from './person-info/person-info.component';
import {PersonCreateComponent} from './person-create/person-create.component';


const routes: Routes = [
  {path: 'list', component: PersonListComponent},
  {path: 'detail/:id', component: PersonInfoComponent},
  {path: 'create', component: PersonCreateComponent},
  {path: '', redirectTo: '/home/home/person/list', pathMatch: 'full'}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule { }
