import {Component, Input, OnInit} from '@angular/core';
import {Person} from '../../domain/person';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PersonService} from '../../service/person.service';

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.scss']
})
export class PersonInfoComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder, private router: Router, private personService: PersonService) {}

  person: Person;
  personForm: FormGroup;

  ngOnInit() {

    this.personForm = this.formBuilder.group({
      firstName : ['', [Validators.required, Validators.maxLength(45)]],
      lastName : ['', [Validators.required, Validators.maxLength(45)]],
      age : ['', Validators.required],
    });

    this.route.paramMap.subscribe(params => {
      this.personService.findOne(+params.get('id')).subscribe(person => {
        this.person = person;

        this.personForm.patchValue({
          id: this.person.id,
          firstName: this.person.firstName,
          lastName: this.person.lastName,
          age: this.person.age
        });
      });
    });
  }

  saveData() {
    this.personService.update(
      this.person.id,
      this.personForm.getRawValue().firstName,
      this.personForm.getRawValue().lastName,
      this.personForm.getRawValue().age);

    this.router.navigate(['home/home/person/list']);
  }
}
