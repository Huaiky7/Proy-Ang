import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BusService} from '../../service/bus.service';
import {Bus} from '../../domain/bus';
import {BrandService} from '../../service/brand.service';
import {Brand} from '../../domain/brand';
import {ModelService} from '../../service/model.service';
import {Model} from '../../domain/model';

@Component({
  selector: 'app-bus-info',
  templateUrl: './bus-info.component.html',
  styleUrls: ['./bus-info.component.scss']
})
export class BusInfoComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private busService: BusService,
              private brandService: BrandService,
              private router: Router,
              private modelService: ModelService) {}

  bus: Bus;
  busForm: FormGroup;
  brands: Brand[];
  models: Model[];

  ngOnInit() {

    this.brandService.findAll().subscribe(list => this.brands = list );

    this.busForm = this.formBuilder.group({
      licensePlate : ['', [Validators.required, Validators.maxLength(6)]],
      numberOfSeats : ['', Validators.required],
      brand : ['', Validators.required],
      model: ['', Validators.required],


    });

    this.route.paramMap.subscribe(params => {
      this.busService.findOne(+params.get('id'))
        .subscribe(bus => {
          this.bus = bus;
          this.busForm.patchValue({
            id: this.bus.id, licensePlate: this.bus.licensePlate, numberOfSeats: this.bus.numberOfSeats,
            brand: this.bus.model.brand, model: this.bus.model
        });

          this.modelService.findAllByBrand(this.bus.model.brand.id).subscribe(list => {
            this.models = list;
          } );
      });
    });
  }

  cmbBrand() {
    this.modelService.findAllByBrand(this.busForm.value.brand.id).subscribe(list => {
      this.models = list;
    } );
  }

  saveData() {
    this.busService.update(
      this.bus.id,
      this.busForm.getRawValue().licensePlate,
      this.busForm.getRawValue().model,
      this.busForm.getRawValue().numberOfSeats)
      .subscribe(token => {
          this.router.navigate(['home/home/bus/list']);
        }
      );
  }

  compare(item1, item2) {
    return item1.id === item2.id;
  }
}
