import { Injectable } from '@angular/core';
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {CounterDialogComponent} from "../../../components/dialog/counter-dialog/counter-dialog.component";
import {HomeCounterDTO} from "../../model/dto/implements/home-counter-dto";
import {DialogMode} from "../../../components/dialog/dialog-mode.enum";
import {SelectedCounter} from "../../model/selectedCounter";
import {DeleteDialogComponent} from "../../../components/dialog/delete-dialog/delete-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class OpenDialogService {

  constructor(private modalService: NgbModal,
              config: NgbModalConfig) {
    config.keyboard = true;
  }

  openCounterDialog(dialogMode: DialogMode, lastCounter: HomeCounterDTO = null, selectedCounter: SelectedCounter = null){
    const openCounterDialog = this.modalService
      .open(CounterDialogComponent, {size: 'lg', fullscreen: 'xl'})
    openCounterDialog.componentInstance.lastCounter = lastCounter;
    openCounterDialog.componentInstance.dialogMode = dialogMode;
    openCounterDialog.componentInstance.selectedCounter = selectedCounter;

    return openCounterDialog;
  }

  openDeleteDialog(selectedCounter: HomeCounterDTO){
    const openDeleteDialog = this.modalService
      .open(DeleteDialogComponent)
    openDeleteDialog.componentInstance.selectedCounter = selectedCounter;

    return openDeleteDialog;
  }
}
