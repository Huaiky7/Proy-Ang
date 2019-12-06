import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusListComponent } from './bus-list/bus-list.component';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule
} from '@angular/material';
import {BusRoutingModule} from './bus-routing.module';
import { BusCreateComponent } from './bus-create/bus-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BusInfoComponent } from './bus-info/bus-info.component';

@NgModule({
  declarations: [BusListComponent, BusCreateComponent, BusInfoComponent],
  imports: [
    CommonModule,
    BusRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
  ]
})
export class BusModule { }
