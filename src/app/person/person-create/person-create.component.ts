import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PersonService} from '../../service/person.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Person} from '../../domain/person';

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.scss']
})
export class PersonCreateComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private personService: PersonService) {}

  personForm: FormGroup;

  ngOnInit() {
    this.personForm = this.formBuilder.group({
      firstName : ['', [Validators.required, Validators.maxLength(45)]],
      lastName : ['', [Validators.required, Validators.maxLength(45)]],
      age : ['', Validators.required],
    });
  }

  saveData() {
    this.personService.create(
      this.personForm.getRawValue().firstName,
      this.personForm.getRawValue().lastName,
      this.personForm.getRawValue().age);

    this.router.navigate(['home/home/person/list']);

  }

}
