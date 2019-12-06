import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Brand} from '../domain/brand';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<Brand[]> {
    return this.httpClient.get<Object[]>(environment.backendURL + 'brand').pipe(
      map(json => json.map(value => new Brand(value))
      ));
  }

}


