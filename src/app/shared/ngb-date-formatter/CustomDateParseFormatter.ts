import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  // Форматирование даты в строку (для отображения)
  format(date: NgbDateStruct | null): string {
    if (date) {
      const day = String(date.day).padStart(2, '0');
      const month = String(date.month).padStart(2, '0');
      const year = date.year;
      return `${day}.${month}.${year}`;
    }
    return '';
  }

  // Парсинг строки в дату (для ввода)
  parse(value: string): NgbDateStruct | null {
    if (value) {
      const parts = value.split('.');
      if (parts.length === 3) {
        return {
          day: parseInt(parts[0], 10),
          month: parseInt(parts[1], 10),
          year: parseInt(parts[2], 10),
        };
      }
    }
    return null;
  }
}
