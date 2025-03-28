import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HomeCounterDTO} from "../../model/dto/implements/home-counter-dto";
import {ApiHomeCountersService} from "./api-home-counters.service";

@Injectable({
  providedIn: 'root'
})
export class HomeCountersService {
  constructor(private apiHomeCounters: ApiHomeCountersService) { }

  getAll(): Observable<HomeCounterDTO[]>{
    return this.apiHomeCounters.getAll$();
  }

  create(counter: HomeCounterDTO): Observable<any>{
    return this.apiHomeCounters.create$(counter);
  }

  update(counter: HomeCounterDTO): Observable<any>{
    return this.apiHomeCounters.update$(counter);
  }

  delete(id: number): Observable<any>{
    return this.apiHomeCounters.delete$(id);
  }
}
