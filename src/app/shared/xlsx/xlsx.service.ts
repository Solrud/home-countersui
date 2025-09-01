import { Injectable } from '@angular/core';
import {Workbook} from 'exceljs/dist/exceljs.min.js';
import {HomeCounterDTO} from "../../data/model/dto/implements/home-counter-dto";
import {DatePipe} from "@angular/common";
import {formatDate} from "../date_formatter/date_formatter_function";

@Injectable({
  providedIn: 'root'
})
export class XlsxService {

  constructor(private datePipe: DatePipe) { }

  async exportExcelCounterTable(sc: HomeCounterDTO, pc: HomeCounterDTO) {

    // Создаем книгу Excel
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Показания счетчиков');

    // Заголовок (дата и адрес)
    worksheet.mergeCells('A1:C1');
    const dateCell = worksheet.getCell('A1');
    const format_date = formatDate('xlsx', new Date(sc.date_create));
    dateCell.value = format_date;
    dateCell.font = { bold: true };

    worksheet.mergeCells('A2:C2');
    const addressCell = worksheet.getCell('A2');
    addressCell.value = 'Наша квартира';
    addressCell.font = { bold: true };


    let meterData;
    // Таблица с показаниями счетчиков
    if (!!pc){
      meterData = [
        { number: 'Номер счетчика', reading: '', value: 'Показания' },
        { number: 453372, reading: 'ХВС', value: sc.counter_453372, previousValue: pc.counter_453372, differenceValue: sc.counter_453372 - pc.counter_453372 },
        { number: 446716, reading: 'ГВС', value: sc.counter_446716, previousValue: pc.counter_446716, differenceValue: sc.counter_446716 - pc.counter_446716 },
        { number: 8385287, reading: 'ХВС', value: sc.counter_8385287, previousValue: pc.counter_8385287, differenceValue: sc.counter_8385287 - pc.counter_8385287 },
        { number: 453411, reading: 'ГВС', value: sc.counter_453411, previousValue: pc.counter_453411, differenceValue: sc.counter_453411 - pc.counter_453411 },
        { number: 'Итого', reading: 'ХВС', value: sc.counter_453372 + sc.counter_8385287, previousValue: pc.counter_453372 + pc.counter_8385287, differenceValue: (sc.counter_453372 + sc.counter_8385287) - (pc.counter_453372 + pc.counter_8385287) },
        { number: 'Итого', reading: 'ГВС', value: sc.counter_446716 + sc.counter_453411, previousValue: pc.counter_446716 + pc.counter_453411, differenceValue: (sc.counter_446716 + sc.counter_453411) - (pc.counter_446716 + pc.counter_453411) }
      ];
    }
    if (!pc){
      meterData = [
        { number: 'Номер счетчика', reading: '', value: 'Показания' },
        { number: 453372, reading: 'ХВС', value: sc.counter_453372, previousValue: null, differenceValue: null },
        { number: 446716, reading: 'ГВС', value: sc.counter_446716, previousValue: null, differenceValue: null },
        { number: 8385287, reading: 'ХВС', value: sc.counter_8385287, previousValue: null, differenceValue: null },
        { number: 453411, reading: 'ГВС', value: sc.counter_453411, previousValue: null, differenceValue: null },
        { number: 'Итого', reading: 'ХВС', value: sc.counter_453372 + sc.counter_8385287, previousValue: null, differenceValue: null },
        { number: 'Итого', reading: 'ГВС', value: sc.counter_446716 + sc.counter_453411, previousValue: null, differenceValue: null }
      ];
    }

    meterData.forEach(row => worksheet.addRow([row.number, row.reading, row.value, row.previousValue, row.differenceValue]));

    if (!!pc){
      worksheet.mergeCells('D1:D3');
      const month = this.datePipe.transform(pc.date_create, 'MMMM', '', 'ru-RU');
      worksheet.getCell('D1').value = `Предыдущие показания (${month})`;
      worksheet.getCell('D1').font = { bold: true };

      worksheet.mergeCells('E1:E3');
      worksheet.getCell('E1').value = 'Расход за отчетный период';
      worksheet.getCell('E1').font = { bold: true };
    }

    // Раздел "Электроэнергия"
    worksheet.mergeCells('A10:C10');
    const electro = worksheet.getCell('A10');
    electro.value = 'Электроэнергия';
    electro.font = { bold: true };

    // Таблица электроэнергии
    if (!!pc){
      worksheet.addRow(['', 'Т1', sc.counter_T1, pc.counter_T1 , sc.counter_T1 - pc.counter_T1]);
      worksheet.addRow(['', 'Т2', sc.counter_T2, pc.counter_T2, sc.counter_T2 - pc.counter_T2]);
    }
    if (!pc){
      worksheet.addRow(['', 'Т1', sc.counter_T1, null , null]);
      worksheet.addRow(['', 'Т2', sc.counter_T2, null, null]);
    }

    // Настройка ширины колонок
    worksheet.columns = [
      { width: 20 }, // Номер счетчика
      { width: 11 }, // ХВС/ГВС
      { width: 19 }, // Показания
      { width: 17 }, // Предыдущие показания
      { width: 17 }  // Расход за отч. период
    ];


    // выделение жирным расхода
    const startRowDifference = 4; // E4
    const endRowDifference = 12;  // E12
    const startColDifference = 5; // E
    const endColDifference = 5;   // E

    for (let row = startRowDifference; row <= endRowDifference; row++){
      for (let col = startColDifference; col <= endColDifference; col++){
        const cell = worksheet.getCell(row, col);
        cell.font = { bold: true };
      }
    }

    // выделение жирным Итого
    const startRowTotal = 8; // A8
    const endRowTotal = 9;  // B9
    const startColTotal = 1; // A
    const endColTotal = 2;   // B

    for (let row = startRowTotal; row <= endRowTotal; row++){
      for (let col = startColTotal; col <= endColTotal; col++){
        const cell = worksheet.getCell(row, col);
        cell.font = { bold: true };
      }
    }

    // границы для таблицы
    const startRow = 1; // A1
    const endRow = 12;  // E12
    const startCol = 1; // A
    const endCol = pc ? 5 : 3;   // E

    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        const cell = worksheet.getCell(row, col);
        cell.border = {
          top: { style: 'thin', color: { argb: 'FF000000' } },
          left: { style: 'thin', color: { argb: 'FF000000' } },
          bottom: { style: 'thin', color: { argb: 'FF000000' } },
          right: { style: 'thin', color: { argb: 'FF000000' } }
        };
        // выравнивание по горизонтали, вертикали и перенос текста
        cell.alignment = {
          horizontal: 'center',
          vertical: 'middle',
          wrapText: true
        }
      }
    }

    // Генерация и скачивание файла
    const buffer = await workbook.xlsx.writeBuffer();
    const dateForTitle = this.datePipe.transform(sc.date_create, 'dd MMMM yyyy', ' ', 'ru-RU');
    this.downloadFile(buffer, `Показания_счетчиков за ${dateForTitle}.xlsx`);
  }


  private downloadFile(buffer: ArrayBuffer, fileName: string): void {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(url); // Освобождаем память
  }
}
