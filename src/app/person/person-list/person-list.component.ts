import { Component, OnInit } from '@angular/core';
import {PersonService} from '../../service/person.service';
import {Person} from '../../domain/person';
import {Router} from '@angular/router';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  constructor(private personService: PersonService, private router: Router) { }

  personSelected: Person = null;

  persons: Person[];
  displayedColumns: string[] = ['firstname', 'lastname', 'age', 'detail'];

  selectPerson(p: Person): void {
    this.personSelected = p;
  }

  goDetail(p: Person): void {
    this.router.navigate(['/home/home/person/detail', p.id]);
  }

  ngOnInit() {
    this.personService.findAll().subscribe(list => this.persons = list );
  }

  addNew() {
    this.router.navigate(['/home/home/person/create']);
  }

}
