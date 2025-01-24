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

registerLocaleData(localeRu, 'ru-RU');

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
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
      provide: LOCALE_ID,
      useValue: 'ru-RU'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
