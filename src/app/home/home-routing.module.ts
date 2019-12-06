import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home.component';
import {AuthGuard} from '../security/guard/auth.guard';


const routes: Routes = [
  {path: 'home', component: HomeComponent,
    children: [
      {
        path: 'person', canActivate: [AuthGuard],
        loadChildren: () => import('../person/person.module').then(mod => mod.PersonModule)
      },
      {
        path: 'bus', canActivate: [AuthGuard],
        loadChildren: () => import('../bus/bus.module').then(mod => mod.BusModule)
      },
      {
        path: 'trip', canActivate: [AuthGuard],
        loadChildren: () => import('../trip/trip.module').then(mod => mod.TripModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/home/trip/list',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
