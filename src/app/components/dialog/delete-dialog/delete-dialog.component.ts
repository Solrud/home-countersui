import { Component } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HomeCountersService} from "../../../data/service/HomeCounters/home-counters.service";
import {DialogResult} from "../dialog-result.enum";
import {HomeCounterDTO} from "../../../data/model/dto/implements/home-counter-dto";

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {
  selectedCounter: HomeCounterDTO;

  constructor(private activeModal: NgbActiveModal,
              private homeCounterService: HomeCountersService) {
  }

  onDeleteCounter(){
    this.homeCounterService.delete(this.selectedCounter.id).subscribe( result => {
      console.log(result)
      if (result){
        this.activeModal.close(DialogResult.DELETE);
      }
    })
  }

  onCloseDialog(){
    this.activeModal.close(DialogResult.CLOSE);
  }
}
