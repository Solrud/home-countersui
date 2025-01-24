import {Inject, Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {BASE_URL} from "./base-url.constant";

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  constructor(@Inject(BASE_URL) private baseUrl: string) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headers =
      new HttpHeaders(
        {
          'Token': 'token-mattheweb@$'
        }
      )
    const newRequest = request.clone({
      headers: headers,
      url: this.baseUrl + request.url,
    })

    return next.handle(newRequest);
  }
}
