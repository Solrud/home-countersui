import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './components/table/table.component';
import {environment} from "../environment/environment";
import {BASE_URL} from "./shared/base-url/base-url.constant";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {BaseUrlInterceptor} from "./shared/base-url/base-url.interceptor";
import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ShowSpinnerDirective } from './shared/spinner/show-spinner.directive';
import {SpinnerInterceptor} from "./shared/spinner/spinner.interceptor";
import { CounterDialogComponent } from './components/dialog/counter-dialog/counter-dialog.component';
import {NgbDateParserFormatter, NgbDatepickerModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CustomDateParserFormatter} from "./shared/ngb-date-formatter/CustomDateParseFormatter";
import { DeleteDialogComponent } from './components/dialog/delete-dialog/delete-dialog.component';

registerLocaleData(localeRu, 'ru-RU');

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    TableComponent,
    SpinnerComponent,
    ShowSpinnerDirective,
    CounterDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbDatepickerModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: BASE_URL,
      useValue: environment.backendURL
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: BaseUrlInterceptor
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: SpinnerInterceptor
    },
    {
      provide: LOCALE_ID,
      useValue: 'ru-RU'
    },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
