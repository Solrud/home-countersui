import { Component } from '@angular/core';
import {NgbActiveModal, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-counter',
  templateUrl: './counter-dialog.component.html',
  styleUrls: ['./counter-dialog.component.css']
})
export class CounterDialogComponent {
  model: NgbDateStruct;

  constructor(private activeModal: NgbActiveModal) {
  }




  onCloseDialog(){
    this.activeModal.close('Close btn');
  }
}
