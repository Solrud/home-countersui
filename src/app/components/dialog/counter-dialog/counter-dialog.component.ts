import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HomeCounterDTO} from "../../../data/model/dto/implements/home-counter-dto";
import {DialogMode} from "../dialog-mode.enum";
import {SelectedCounter} from "../../../data/model/selectedCounter";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HomeCountersService} from "../../../data/service/HomeCounters/home-counters.service";
import {DialogResult} from "../dialog-result.enum";

@Component({
  selector: 'app-counter',
  templateUrl: './counter-dialog.component.html',
  styleUrls: ['./counter-dialog.component.css']
})
export class CounterDialogComponent implements OnInit {
  currentDate: Date;

  lastCounter: HomeCounterDTO;
  selectedCounter: SelectedCounter;
  dialogMode: DialogMode;

  fgCurrentHomeCounters: FormGroup;
  fgPreviousHomeCounters: FormGroup;
  fgDifferenceHomeCounters: FormGroup;

  previousSumHWS: number = 0;
  previousSumCWS: number = 0;

  newCounter: HomeCounterDTO;

  previousDate: Date;

  fcSmall: boolean = false;

  constructor(private activeModal: NgbActiveModal,
              private homeCounterService: HomeCountersService) {
  }

  public get DialogMode() {
    return DialogMode;
  }

  fcFieldIsRequired(fg: FormGroup, fcName: string, returnBoolean: boolean = false): any {
    let fcRequired = fg.controls[fcName].hasValidator(Validators.required)
    return returnBoolean ? fcRequired : (fcRequired ? ' *' : '');
  }

  ngOnInit() {
    this.initDialogDefaultValues();

    this.initFgCurrentHomeCounters();
    this.initFgPreviousHomeCounters();
    this.initFgDifferenceHomeCounters();

    this.afterInitDialogDefaultValues();

    this._subscribeCurrent_453372();
    this._subscribeCurrent_446716();
    this._subscribeCurrent_8385287();
    this._subscribeCurrent_453411();
    this._subscribeCurrent_T1();
    this._subscribeCurrent_T2();
    this._subscribeCurrentSumHWS();
    this._subscribeCurrentSumCWS();
  }

  initDialogDefaultValues(){
    if (!this.currentDate) this.currentDate = new Date();
    if (!this.dialogMode) this.dialogMode = DialogMode.VIEW;
    if (!this.selectedCounter) this.selectedCounter = null;
  }

  afterInitDialogDefaultValues(){
    if (this.dialogMode === DialogMode.CREATE){
      this.setValuePreviousCounters();
      this.previousDate = new Date(this.lastCounter.date_create);
    }
    if (this.dialogMode != DialogMode.CREATE){
      if (this.selectedCounter.previousCounter){
        this.previousDate = new Date(this.selectedCounter.previousCounter.date_create);
      }
    }
  }

  getCorrectCurrentValueFromField(field: string){
    if (this.dialogMode === DialogMode.CREATE){
      if (field === 'date_picked')
        return {
          year: this.currentDate.getFullYear(),
          month: this.currentDate.getMonth() + 1,
          day: this.currentDate.getDate(),
        }
    }
    if (this.dialogMode != DialogMode.CREATE){
      if (field === 'date_picked'){
        const date = new Date(this.selectedCounter.selectedCounter.date_create);
        return {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
        }
      }
      if (field === 'current_sumHWS'){
        const counter_446716 = this.selectedCounter.selectedCounter["counter_446716"];
        const counter_453411 = this.selectedCounter.selectedCounter["counter_453411"];
        return counter_446716 + counter_453411;
      }
      if (field === 'current_sumCWS'){
        const counter_453372 = this.selectedCounter.selectedCounter["counter_453372"];
        const counter_8385287 = this.selectedCounter.selectedCounter["counter_8385287"];
        return counter_453372 + counter_8385287;
      }
      return this.selectedCounter.selectedCounter[field];
    }
    return null;
  }

  getCorrectPreviousValueFromField(field: string){
    if (this.dialogMode === DialogMode.CREATE){
      if (this.lastCounter){
        if (field != 'previous_sumHWS' && field != 'previous_sumCWS')
        return this.lastCounter[field]
      }
    }
    if (this.dialogMode != DialogMode.CREATE){
      if (this.selectedCounter.previousCounter){
        if (field === 'previous_sumHWS'){
          const counter_446716 = this.selectedCounter.previousCounter["counter_446716"];
          const counter_453411 = this.selectedCounter.previousCounter["counter_453411"];
          return counter_446716 + counter_453411;
        }
        if (field === 'previous_sumCWS'){
          const counter_453372 = this.selectedCounter.previousCounter["counter_453372"];
          const counter_8385287 = this.selectedCounter.previousCounter["counter_8385287"];
          return counter_453372 + counter_8385287;
        }
      }
      if (this.selectedCounter.previousCounter)
        return this.selectedCounter.previousCounter[field];
    }
    return 0;
  }

  getCorrectDifferenceValueFromField(field: string){
    if (this.dialogMode != DialogMode.CREATE){
      if (field == 'difference_sumHWS'){
        const current = this.fgCurrentHomeCounters.get('current_sumHWS').value;
        const previous = this.fgPreviousHomeCounters.get('previous_sumHWS').value;
        return current - previous;
      }
      if (field == 'difference_sumCWS'){
        const current = this.fgCurrentHomeCounters.get('current_sumCWS').value;
        const previous = this.fgPreviousHomeCounters.get('previous_sumCWS').value;
        return current - previous;
      }
      if (field != 'difference_sumHWS' && field != 'difference_sumCWS'){
        const current_counter = Number(this.fgCurrentHomeCounters.get(String('current_' + field)).value);
        const previous_counter = Number(this.fgPreviousHomeCounters.get(String('previous_' + field)).value);
        return current_counter - previous_counter;
      }
    }

    return 0;
  }

  initFgCurrentHomeCounters(){
    this.fgCurrentHomeCounters = new FormGroup({
      current_453372: new FormControl({value: this.getCorrectCurrentValueFromField('counter_453372'), disabled: false}, Validators.required),
      current_446716: new FormControl({value: this.getCorrectCurrentValueFromField('counter_446716'), disabled: false}, Validators.required),
      current_8385287: new FormControl({value: this.getCorrectCurrentValueFromField('counter_8385287'), disabled: false}, Validators.required),
      current_453411: new FormControl({value: this.getCorrectCurrentValueFromField('counter_453411'), disabled: false}, Validators.required),

      current_sumHWS: new FormControl({value: this.getCorrectCurrentValueFromField('current_sumHWS'), disabled: true}),
      current_sumCWS: new FormControl({value: this.getCorrectCurrentValueFromField('current_sumCWS'), disabled: true}),

      current_T1: new FormControl({value: this.getCorrectCurrentValueFromField('counter_T1'), disabled: false}, Validators.required),
      current_T2: new FormControl({value: this.getCorrectCurrentValueFromField('counter_T2'), disabled: false}, Validators.required),

      date_picked: new FormControl({value: this.getCorrectCurrentValueFromField('date_picked'), disabled: false}, Validators.required)
    })
  }

  initFgPreviousHomeCounters() {
    this.fgPreviousHomeCounters = new FormGroup({
      previous_453372: new FormControl({value: this.getCorrectPreviousValueFromField('counter_453372'), disabled: true}),
      previous_446716: new FormControl({value: this.getCorrectPreviousValueFromField('counter_446716'), disabled: true}),
      previous_8385287: new FormControl({value: this.getCorrectPreviousValueFromField('counter_8385287'), disabled: true}),
      previous_453411: new FormControl({value: this.getCorrectPreviousValueFromField('counter_453411'), disabled: true}),

      previous_sumHWS: new FormControl({value: this.getCorrectPreviousValueFromField('previous_sumHWS'), disabled: true}),
      previous_sumCWS: new FormControl({value: this.getCorrectPreviousValueFromField('previous_sumCWS'), disabled: true}),

      previous_T1: new FormControl({value: this.getCorrectPreviousValueFromField('counter_T1'), disabled: true}),
      previous_T2: new FormControl({value: this.getCorrectPreviousValueFromField('counter_T2'), disabled: true}),
    })
  }

  initFgDifferenceHomeCounters(){
    this.fgDifferenceHomeCounters = new FormGroup({
      difference_453372: new FormControl({value: this.getCorrectDifferenceValueFromField('453372'), disabled: true}),
      difference_446716: new FormControl({value: this.getCorrectDifferenceValueFromField('446716'), disabled: true}),
      difference_8385287: new FormControl({value: this.getCorrectDifferenceValueFromField('8385287'), disabled: true}),
      difference_453411: new FormControl({value: this.getCorrectDifferenceValueFromField('453411'), disabled: true}),

      difference_sumHWS: new FormControl({value: this.getCorrectDifferenceValueFromField('difference_sumHWS'), disabled: true}),
      difference_sumCWS: new FormControl({value: this.getCorrectDifferenceValueFromField('difference_sumCWS'), disabled: true}),

      difference_T1: new FormControl({value: this.getCorrectDifferenceValueFromField('T1'), disabled: true}),
      difference_T2: new FormControl({value: this.getCorrectDifferenceValueFromField('T2'), disabled: true}),
    })
  }

  _subscribeCurrent_453372(){
    this.fgCurrentHomeCounters.controls['current_453372']
      .valueChanges.subscribe( result => {
        const difference = result - this.fgPreviousHomeCounters.get('previous_453372').value;
        this.fgDifferenceHomeCounters.get('difference_453372').setValue(difference);

        this.changeValueCurrentSumCWS();
    })
  }
  _subscribeCurrent_446716(){
    this.fgCurrentHomeCounters.controls['current_446716']
      .valueChanges.subscribe( result => {
        const difference = result - this.fgPreviousHomeCounters.get('previous_446716').value;
        this.fgDifferenceHomeCounters.get('difference_446716').setValue(difference);

        this.changeValueCurrentSumHWS();
    })
  }
  _subscribeCurrent_8385287(){
    this.fgCurrentHomeCounters.controls['current_8385287']
      .valueChanges.subscribe( result => {
        const difference = result - this.fgPreviousHomeCounters.get('previous_8385287').value;
        this.fgDifferenceHomeCounters.get('difference_8385287').setValue(difference);

        this.changeValueCurrentSumCWS();
    })
  }
  _subscribeCurrent_453411(){
    this.fgCurrentHomeCounters.controls['current_453411']
      .valueChanges.subscribe( result => {
        const difference = result - this.fgPreviousHomeCounters.get('previous_453411').value;
        this.fgDifferenceHomeCounters.get('difference_453411').setValue(difference);

        this.changeValueCurrentSumHWS();
    })
  }
  _subscribeCurrent_T1(){
    this.fgCurrentHomeCounters.controls['current_T1']
      .valueChanges.subscribe( result => {
        const difference = result - this.fgPreviousHomeCounters.get('previous_T1').value;
        this.fgDifferenceHomeCounters.get('difference_T1').setValue(difference);
    })
  }
  _subscribeCurrent_T2(){
    this.fgCurrentHomeCounters.controls['current_T2']
      .valueChanges.subscribe( result => {
        const difference = result - this.fgPreviousHomeCounters.get('previous_T2').value;
        this.fgDifferenceHomeCounters.get('difference_T2').setValue(difference);
    })
  }
  changeValueCurrentSumHWS(){
    const current_446716 = this.fgCurrentHomeCounters.get('current_446716').value;
    const current_453411 = this.fgCurrentHomeCounters.get('current_453411').value;

    const current_sum = current_446716 + current_453411;
    this.fgCurrentHomeCounters.get('current_sumHWS').setValue(current_sum);
  }
  changeValueCurrentSumCWS(){
    const current_453372 = this.fgCurrentHomeCounters.get('current_453372').value;
    const current_8385287 = this.fgCurrentHomeCounters.get('current_8385287').value;

    const current_sum = current_453372 + current_8385287;
    this.fgCurrentHomeCounters.get('current_sumCWS').setValue(current_sum);
  }

  setValuePreviousCounters(){
    const previousCounter = this.dialogMode === DialogMode.CREATE ? this.lastCounter : this.selectedCounter.previousCounter;
    const previous_453372CWS = previousCounter.counter_453372;
    const previous_446716HWS = previousCounter.counter_446716;
    const previous_8385287CWS = previousCounter.counter_8385287;
    const previous_453411HWS = previousCounter.counter_453411;

    const sumHWS = previous_453411HWS + previous_446716HWS;
    const sumCWS = previous_453372CWS + previous_8385287CWS;

    this.previousSumHWS = sumHWS;
    this.previousSumCWS = sumCWS;

    this.fgPreviousHomeCounters.get('previous_sumHWS').setValue(sumHWS);
    this.fgPreviousHomeCounters.get('previous_sumCWS').setValue(sumCWS);
  }

  _subscribeCurrentSumHWS(){
    this.fgCurrentHomeCounters.get('current_sumHWS')
      .valueChanges.subscribe( result => {
        const difference = result - this.previousSumHWS;
        this.fgDifferenceHomeCounters.get('difference_sumHWS').setValue(difference);
    })
  }

  _subscribeCurrentSumCWS(){
    this.fgCurrentHomeCounters.get('current_sumCWS')
      .valueChanges.subscribe( result => {
      const difference = result - this.previousSumCWS;
      this.fgDifferenceHomeCounters.get('difference_sumCWS').setValue(difference);
    })
  }

  formatDate(formatFor: string, date: Date = new Date()): string {
    let pickedDate;
    let month;
    let year;
    let day;
    if (formatFor === 'create'){
      pickedDate = this.fgCurrentHomeCounters.get('date_picked').value;
      year = String(pickedDate.year);
      month = String(pickedDate.month).length == 1 ?
        '0' + String(pickedDate.month) :
        String(pickedDate.month);
      day = String(pickedDate.day).length == 1 ?
        '0' + String(pickedDate.day) :
        String(pickedDate.day);
    }
    if (formatFor === 'edit'){
      year = String(date.getFullYear());
      month = String(date.getMonth() + 1).length === 1 ?
        '0' + String(date.getMonth() + 1): String(date.getMonth() + 1)
      day = String(date.getDate()).length === 1 ?
        '0' + String(date.getDate()): String(date.getDate())
    }
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  updateNewCounter(){
    this.newCounter = new HomeCounterDTO();
    this.newCounter.id = this.dialogMode === DialogMode.CREATE ?
      null : this.selectedCounter.selectedCounter.id;
    this.newCounter.counter_453372 = this.fgCurrentHomeCounters.get('current_453372').value;
    this.newCounter.counter_446716 = this.fgCurrentHomeCounters.get('current_446716').value;
    this.newCounter.counter_8385287 = this.fgCurrentHomeCounters.get('current_8385287').value;
    this.newCounter.counter_453411 = this.fgCurrentHomeCounters.get('current_453411').value;
    this.newCounter.counter_T1 = this.fgCurrentHomeCounters.get('current_T1').value;
    this.newCounter.counter_T2 = this.fgCurrentHomeCounters.get('current_T2').value;
    this.newCounter.date_create = this.formatDate('create');
    this.newCounter.date_edit = this.formatDate('edit');
  }

  onEditCounter(){
    this.updateNewCounter();
    this.homeCounterService.update(this.newCounter).subscribe( result => {
      if(result)
        this.activeModal.close(DialogResult.EDIT);
    })
  }

  onCreateCounter(){
    this.updateNewCounter();
    this.homeCounterService.create(this.newCounter).subscribe( result => {
      if(result)
        this.activeModal.close(DialogResult.CREATE);
    })
  }

  onCloseDialog() {
    this.activeModal.close(DialogResult.CLOSE);
  }
}
