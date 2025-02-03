import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FIELD_COLUMN_LIST, FIELD_NAME_OBJ} from "../../app.constant";
import {SelectedCounter} from "../../data/model/selectedCounter";
import {HomeCounterDTO} from "../../data/model/dto/implements/home-counter-dto";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  fieldColumnNameObject = FIELD_NAME_OBJ;
  dataTableSource: any;
  selectedObject: any;

  @Input()
  fieldColumnList = FIELD_COLUMN_LIST;
  @Input()
  set dataTableSourceSet(value: any){
    this.dataTableSource = value;
    this.selectedObject = null;
  }

  @Output()
  selectedObjectOutput = new EventEmitter<any>();

  isDataSourceFull(): boolean{
    let result = false;
    if (this.dataTableSource?.length > 0) result = true;
    if (this.dataTableSource?.size > 0) result = true;
    return result;
  }

  getNameField(field: string): string{
    return this.fieldColumnNameObject[field];
  }

  onSelectTableElement(index: number): void{
    const selectedElement = this.dataTableSource[index];
    let previousElement = null;
    if (this.dataTableSource[index + 1])
      previousElement = this.dataTableSource[index + 1];

    let selectedObj = new SelectedCounter();

    if (this.selectedObject != selectedElement){
      selectedObj.selectedCounter = selectedElement;
      selectedObj.previousCounter = previousElement;
      this.selectedObject = selectedElement;
    } else {
      this.selectedObject = null;
      selectedObj = null;
    }

    this.selectedObjectOutput.emit(selectedObj);
  }
}
