import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../../data/service/Auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let accessToken = this.authService.getAccessToken?.trim();
    const headers =
      new HttpHeaders(
        {
          'Token': 'token-mattheweb@$',
          'Auth': `Bearer ${accessToken}`
        }
      )

    const newRequest = request.clone({
      headers: headers,
    })

    return next.handle(newRequest);
  }
}
