import {Component, OnInit} from '@angular/core';
import {FIELD_COLUMN_LIST} from "../../app.constant";
import {HomeCountersService} from "../../data/service/HomeCounters/home-counters.service";
import {HomeCounterDTO} from "../../data/model/dto/implements/home-counter-dto";
import {catchError, of} from "rxjs";
import {OpenDialogService} from "../../data/service/OpenDialog/open-dialog.service";
import {SelectedCounter} from "../../data/model/selectedCounter";
import {DialogMode} from "../../components/dialog/dialog-mode.enum";
import {DialogResult} from "../../components/dialog/dialog-result.enum";
import {ToastService} from "../../data/service/Toast/toast.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  fieldColumnList = FIELD_COLUMN_LIST;
  dataTable: HomeCounterDTO[] = [];
  errorMsg: string | null = null;

  lastCounter: HomeCounterDTO | null = null;
  selectedCounter: SelectedCounter | null = null;

  constructor(private homeCounterService: HomeCountersService,
              private openDialogService: OpenDialogService,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.getAllCounters();
  }

  getAllCounters(){
    this.selectedCounter = null;
    this.lastCounter = null;
    this.homeCounterService
      .getAll()
      .pipe(
        catchError(error => {
          this.errorMsg = error.message;
          return of(null);
        })
      )
      .subscribe( result => {
        if(result){
          this.dataTable = result;

          this.lastCounter = result[0];
        }
      }, error => {
        this.errorMsg = error.message;
      });
  }

  addCounterDialog(){
    this.openDialogService
      .openCounterDialog(DialogMode.CREATE, this.lastCounter)
      .closed
      .subscribe( result => {
        if (result === DialogResult.CREATE){
          this.toastService.showPositive('Успешно создан счетчик');
          this.getAllCounters();
        }
    });
  }

  editCounterDialog(){
    this.openDialogService
      .openCounterDialog(DialogMode.EDIT, null, this.selectedCounter)
      .closed
      .subscribe( result => {
        if (result === DialogResult.EDIT){
          this.toastService.showPositive('Успешно изменен счетчик');
          this.getAllCounters();
        }
      });
  }

  deleteCounterDialog(){
    this.openDialogService.openDeleteDialog(this.selectedCounter.selectedCounter)
      .closed
      .subscribe( result => {
        if (result === DialogResult.DELETE){
          this.toastService.showPositive('Успешно удален счетчик');
          this.getAllCounters();
        }
    })
  }

  onSelectTableElement(counter: SelectedCounter){
    this.selectedCounter = counter;
  }
}
