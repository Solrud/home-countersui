import {Component, OnInit} from '@angular/core';
import {ThemeSwitchService} from "./data/service/Theme-switch/theme-switch.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {class: 'd-flex h-100 w-100 flex-column bg-main'}
})
export class AppComponent implements OnInit{

  constructor(private themeService: ThemeSwitchService) {
  }

  ngOnInit() {
    let lsTheme = localStorage.getItem('theme');

    if (lsTheme) {
      this.themeService.changeTheme(lsTheme as 'light' | 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }
}
