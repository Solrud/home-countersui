import {Component, OnInit} from '@angular/core';
import {FIELD_COLUMN_LIST} from "../../app.constant";
import {HomeCountersService} from "../../data/service/HomeCounters/home-counters.service";
import {HomeCounterDTO} from "../../data/model/dto/implements/home-counter-dto";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  fieldColumnList = FIELD_COLUMN_LIST;
  dataTable: HomeCounterDTO[] = [];
  constructor(private homeCounterService: HomeCountersService) {
  }

  ngOnInit() {
    this.homeCounterService.getAll().subscribe( result => {
      if(result){
        this.dataTable = result;
      }
    });
  }

}
