import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isLoggedIn()) {
      req = req.clone({
        setHeaders: {
          Authorization: this.authService.token
        }
      });
    } else {

      if ((req.method !== 'POST') && (req.url !== environment.backendURL + 'login')) {
        this.router.navigate(['login']);
        return of(null);
      }
    }

    return next.handle(req);
  }
}
