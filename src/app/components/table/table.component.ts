import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FIELD_NAME_OBJ} from "../../app.constant";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  fieldColumnNameObject = FIELD_NAME_OBJ;

  @Input()
  fieldColumnList = [];
  @Input()
  dataTableSource: any;
  @Input()
  selectedObject: any;
  // @Input()
  // totalFoundedObjects: number;
  // @Input()
  // objectSearch: ABaseSearch;

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

  onSelectTableElement(selectedElement: any){
    this.selectedObject = this.selectedObject != selectedElement ? selectedElement : null;

    this.selectedObjectOutput.emit(this.selectedObject)
  }
}
