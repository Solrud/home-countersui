import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HomeCountersService} from "../../../data/service/HomeCounters/home-counters.service";
import {DialogResult} from "../dialog-result.enum";
import {HomeCounterDTO} from "../../../data/model/dto/implements/home-counter-dto";

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit{
  selectedCounterList = [];
  selectedCounter: HomeCounterDTO;

  constructor(private activeModal: NgbActiveModal,
              private homeCounterService: HomeCountersService) {
  }

  ngOnInit(): void {
    this.selectedCounterList.push(this.selectedCounter);
  }

  onDeleteCounter(){
    this.homeCounterService.delete(this.selectedCounter.id).subscribe( result => {
      if (result){
        this.activeModal.close(DialogResult.DELETE);
      }
    })
  }

  onCloseDialog(){
    this.activeModal.close(DialogResult.CLOSE);
  }
}
