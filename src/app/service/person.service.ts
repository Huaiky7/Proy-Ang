import { Injectable } from '@angular/core';
import {Person} from '../domain/person';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<Person[]> {
    return this.httpClient.get<Object[]>(environment.backendURL + 'persons').pipe(
      map(json => json.map(value => new Person(value))
      ));
  }

  public findOne(id: number): Observable<Person> {
    return this.httpClient.get<Object>(environment.backendURL + 'persons/' + id).pipe(
      map(json => new Person(json)
      ));
  }

  public update(id: number, firstName: string, lastName: string, age: number): void {
    const body = {
      id,
      firstName,
      lastName,
      age
    };

    this.httpClient.put(environment.backendURL + 'persons', body).subscribe();
  }

  public create(firstName: string, lastName: string, age: number): void {
    const id = 0;
    const body = {
      id,
      firstName,
      lastName,
      age
    };

    this.httpClient.post(environment.backendURL + 'persons', body).subscribe();
  }
}


