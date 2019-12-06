import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Bus} from '../domain/bus';
import {environment} from '../../environments/environment';
import {Model} from '../domain/model';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<Bus[]> {
    return this.httpClient.get<Object[]>(environment.backendURL + 'buses')
      .pipe(
        map(json => json.map(value => new Bus(value))),
        catchError(res => {
          let errorMsg: string;
          switch (res.status) {
            case 401:
              errorMsg = 'Usuario No Autorizado';
              break;
            default:
              errorMsg = 'Error en el servidor';
          }
          return throwError(errorMsg);
        })
      );
  }


  public findOne(id: number): Observable<Bus> {
    return this.httpClient.get<Object>(environment.backendURL + 'buses/' + id)
      .pipe(
        map(json => new Bus(json)),
        catchError(res => {
          let errorMsg: string;
          switch (res.status) {
            case 401:
              errorMsg = 'Usuario No Autorizado';
              break;
            default:
              errorMsg = 'Error en el servidor';
          }
          return throwError(errorMsg);
        })
      );
  }

  public update(id: number, licensePlate: string, model: Model, numberOfSeats: number): Observable<any> {
    const body = {
      id,
      licensePlate,
      model,
      numberOfSeats
    };

    return this.httpClient.put(environment.backendURL + 'buses', body)
      .pipe(
        catchError(res => {
          let errorMsg: string;
          switch (res.status) {
            case 401:
              errorMsg = 'Usuario No Autorizado';
              break;
            default:
              errorMsg = 'Error en el servidor';
          }
          return throwError(errorMsg);
        })
      );
  }

  public create(licensePlate: string, model: Model, numberOfSeats: number): Observable<any> {
    const id = null;
    const body = {
      id,
      licensePlate,
      model,
      numberOfSeats
    };

    return this.httpClient.post(environment.backendURL + 'buses', body)
      .pipe(
        catchError(res => {
          let errorMsg: string;
          switch (res.status) {
            case 401:
              errorMsg = 'Usuario No Autorizado';
              break;
            default:
              errorMsg = 'Error en el servidor';
          }
          return throwError(errorMsg);
        })
      );
  }

}


