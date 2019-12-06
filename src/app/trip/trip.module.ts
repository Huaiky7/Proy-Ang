import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripListComponent } from './trip-list/trip-list.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatNativeDateModule,
  MatSelectModule,
  MatTableModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TripRoutingModule} from './trip-routing.module';
import { TripInfoComponent } from './trip-info/trip-info.component';
import { TripCreateComponent } from './trip-create/trip-create.component';
import { AddPassengerComponent } from './add-passenger/add-passenger.component';



@NgModule({
  declarations: [TripListComponent, TripInfoComponent, TripCreateComponent, AddPassengerComponent],
  imports: [
    CommonModule,
    TripRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatIconModule,
  ]
})
export class TripModule { }
