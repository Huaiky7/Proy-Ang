import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {catchError, filter, map, tap} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from '../../domain/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private jwtHelper: JwtHelperService = new JwtHelperService();

  private _loggedIn: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    const body = {
      username,
      password
    };

    return this.http.post(environment.backendURL + 'login', body)
      .pipe(tap(res => {
        localStorage.setItem(environment.tokenName, res.token);
        let decodedToken = this.jwtHelper.decodeToken(res.token);
        let user: User = new User({username: decodedToken.username});
        this._loggedIn.next(user);
      }),
        catchError(res => {
          let errorMsg: string;
          switch (res.status) {
            case 401:
              errorMsg = 'Usuario o Contraseña incorrectos';
              break;
            default:
              errorMsg = 'Error en el servidor';
          }
          return throwError(errorMsg);
        }));
  }

  logout() {
    this._loggedIn.next(null);
    localStorage.removeItem(environment.tokenName);
    return this.router.navigate(['login']);
  }

  get token(): string {
    return localStorage.getItem(environment.tokenName);
  }

  isLoggedIn(): boolean {
    if ((this.token !== null) && !this.jwtHelper.isTokenExpired(this.token)) {
      if (this._loggedIn.value === null) {
        this._loggedIn.next(new User(
          {username: this.jwtHelper.decodeToken(this.token).username}
        ));
      }
      return true;
    }
    return false;

  }

  get loggedIn(): Observable<User> {
    return this._loggedIn.asObservable().pipe(filter(user => user !== null));
  }
}
