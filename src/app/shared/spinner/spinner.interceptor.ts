import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {EventService} from "../../data/service/Event/event.service";

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  counterActiveRequests: number = 0;

  constructor(private eventService: EventService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.counterActiveRequests === 0)
      this.eventService.spinnerVisibility$.next(true);

    this.counterActiveRequests++;

    return next.handle(request)
      .pipe(
        finalize(() => {
          this.counterActiveRequests--;
          if(this.counterActiveRequests === 0)
            this.eventService.spinnerVisibility$.next(false);
        })
      );
  }
}
