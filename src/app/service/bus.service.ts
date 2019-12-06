import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Bus} from '../domain/bus';
import {environment} from '../../environments/environment';
import {Model} from '../domain/model';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<Bus[]> {
    return this.httpClient.get<Object[]>(environment.backendURL + 'buses').pipe(
      map(json => json.map(value => new Bus(value))
      ));
  }


  public findOne(id: number): Observable<Bus> {
    return this.httpClient.get<Object>(environment.backendURL + 'buses/' + id).pipe(
      map(json => new Bus(json)
      ));
  }

  public update(id: number, licensePlate: string, model: Model, numberOfSeats: number): void {
    const body = {
      id,
      licensePlate,
      model,
      numberOfSeats
    };

    this.httpClient.put(environment.backendURL + 'buses', body).subscribe();
  }

  public create(licensePlate: string, model: Model, numberOfSeats: number): void {
    const id = null;
    const body = {
      id,
      licensePlate,
      model,
      numberOfSeats
    };

    this.httpClient.post(environment.backendURL + 'buses', body).subscribe();
  }

}


