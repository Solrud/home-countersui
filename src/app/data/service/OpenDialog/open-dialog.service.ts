import { Injectable } from '@angular/core';
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {CounterDialogComponent} from "../../../components/dialog/counter-dialog/counter-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class OpenDialogService {

  constructor(private modalService: NgbModal,
              config: NgbModalConfig) {
    config.keyboard = true;
  }

  openCounterDialog(){
    const openCounterDialog = this.modalService
      .open(CounterDialogComponent, {size: 'lg', fullscreen: 'xl', centered: true})

    return openCounterDialog;
  }
}
