import {Component, OnInit} from '@angular/core';
import {FIELD_COLUMN_LIST} from "../../app.constant";
import {HomeCountersService} from "../../data/service/HomeCounters/home-counters.service";
import {HomeCounterDTO} from "../../data/model/dto/implements/home-counter-dto";
import {catchError, of} from "rxjs";
import {OpenDialogService} from "../../data/service/OpenDialog/open-dialog.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  fieldColumnList = FIELD_COLUMN_LIST;
  dataTable: HomeCounterDTO[] = [];
  errorMsg: string | null = null;

  constructor(private homeCounterService: HomeCountersService,
              private openDialogService: OpenDialogService) {
  }

  ngOnInit() {
    this.homeCounterService
      .getAll()
      .pipe(
        catchError(error => {
          this.errorMsg = error.message;
          return of(null);
        })
      )
      .subscribe( result => {
      if(result)
        this.dataTable = result;
      }, error => {
        this.errorMsg = error.message;
      });
  }

  addCounterDialog(){
    this.openDialogService.openCounterDialog();
  }

}
