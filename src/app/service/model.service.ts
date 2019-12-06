import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Model} from '../domain/model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private httpClient: HttpClient) { }

  public findAllByBrand(id: number): Observable<Model[]> {
    return this.httpClient.get<Object[]>(environment.backendURL + 'model/' + id).pipe(
      map(json => json.map(value => new Model(value))
      ));
  }
}


