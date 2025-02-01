import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
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

  create$(counter: HomeCounterDTO): Observable<any>{
    return this.httpClient
      .post<any>('/addnewcounter', counter);
  }

  update$(counter: HomeCounterDTO): Observable<any>{
    return this.httpClient
      .post('/updatecounter', counter);
  }

  delete$(id: number): Observable<any>{
    return this.httpClient
      .post<any>('/deletecounter', id)
      .pipe(
        map( result => result.success)
      );
  }
}
