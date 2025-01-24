import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HomeCounterDTO} from "../../model/dto/implements/home-counter-dto";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiHomeCountersService {
  constructor(private httpClient: HttpClient) {
  }

  getAll$(): Observable<HomeCounterDTO[]>{
    return this.httpClient
      .get<HomeCounterDTO[]>('/getallcounters');
  }

}
