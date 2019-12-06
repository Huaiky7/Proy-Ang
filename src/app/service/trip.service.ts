import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Trip} from '../domain/trip';
import {Bus} from '../domain/bus';
import {Person} from '../domain/person';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<Trip[]> {
    return this.httpClient.get<Object[]>(environment.backendURL + 'trips').pipe(
      map(json => json.map(value => new Trip(value))
      ));
  }

  public findOne(id: number): Observable<Trip> {
    return this.httpClient.get<Object>(environment.backendURL + 'trips/' + id).pipe(
      map(json => new Trip(json)
      ));
  }

  public update(id: number, departure: string, destination: string,
                startDate: number, endDate: number, bus: Bus,
                passengers: Person[]): Observable<any>  {
    const body = {
      id,
      departure,
      destination,
      bus,
      passengers,
      startDate,
      endDate
    };

    return this.httpClient.put(environment.backendURL + 'trips', body);
  }

  public create(departure: string, destination: string,
                startDate: number, endDate: number, bus: Bus,
                passengers: Person[]): void {
    const id = null;
    const body = {
      id,
      departure,
      destination,
      bus,
      passengers,
      startDate,
      endDate
    };

    console.log(body);
    this.httpClient.post(environment.backendURL + 'trips', body).subscribe();
  }
}


