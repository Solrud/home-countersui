import { Injectable } from '@angular/core';
import {Meta} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitchService {
  private theme: 'light' | 'dark' = 'light';

  constructor(private meta: Meta) {}

  public getTheme(): string{
    return this.theme;
  }

  private updateMetaTheme(color: string): void {
    this.meta.updateTag({name: 'theme-color', content: color})
  }

  changeTheme(theme: 'light' | 'dark'): void {
    this.theme = theme;
    this.theme == 'light' ? this.updateMetaTheme('#87bdfa') : this.updateMetaTheme('#244c94')
    document.body.setAttribute('data-theme', this.theme);

    localStorage.setItem('theme', this.theme);
  }

  toggleTheme(): void{
    this.theme = this.theme === 'light' ? 'dark' : 'light';

    this.theme == 'light' ? this.updateMetaTheme('#87bdfa') : this.updateMetaTheme('#244c94')
    document.body.setAttribute('data-theme', this.theme);

    localStorage.setItem('theme', this.theme);
  }
}
