import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitchService {
  theme: 'light' | 'dark' = 'light';

  constructor() { }

  toggleTheme(): void{
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', this.theme)
  }

}
