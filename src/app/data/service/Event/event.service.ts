import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  spinnerVisibility$ = new BehaviorSubject<boolean>(false);
}
