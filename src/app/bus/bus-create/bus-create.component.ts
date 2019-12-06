import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BusService} from '../../service/bus.service';
import {Brand} from '../../domain/brand';
import {BrandService} from '../../service/brand.service';
import {ModelService} from '../../service/model.service';
import {Model} from '../../domain/model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bus-create',
  templateUrl: './bus-create.component.html',
  styleUrls: ['./bus-create.component.scss']
})
export class BusCreateComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private busService: BusService,
              private brandService: BrandService,
              private router: Router,
              private modelService: ModelService) {}


  busForm: FormGroup;
  brands: Brand[];
  models: Model[];
  error: boolean;
  errorMsg: string;

  ngOnInit() {
    this.brandService.findAll().subscribe(list => this.brands = list );

    this.busForm = this.formBuilder.group({
      licensePlate : ['', [Validators.required, Validators.maxLength(6)]],
      numberOfSeats : ['', Validators.required],
      brand : ['', Validators.required],
      model : ['', Validators.required],
    });
  }

  cmbBrand() {
    this.modelService.findAllByBrand(this.busForm.value.brand.id).subscribe(list => {
      this.models = list;
    } );
  }

  saveData() {
    this.busService.create(
      this.busForm.getRawValue().licensePlate,
      this.busForm.getRawValue().model,
      this.busForm.getRawValue().numberOfSeats)
      .subscribe(bus => {
          this.router.navigate(['home/home/bus/list']);
        },
        error => {
          this.error = true;
          this.errorMsg = error;
        }
      );
  }
}
