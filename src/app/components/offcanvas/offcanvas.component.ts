import { Component } from '@angular/core';
import {NgbActiveOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {ThemeSwitchService} from "../../data/service/Theme-switch/theme-switch.service";

@Component({
  selector: 'app-offcanvas',
  templateUrl: './offcanvas.component.html',
  styleUrls: ['./offcanvas.component.css']
})
export class OffcanvasComponent {
  constructor(public activeOffcanvas: NgbActiveOffcanvas,
              private themeSwitcherService: ThemeSwitchService) {
  }
  onClickSwitchTheme(){
    this.themeSwitcherService.toggleTheme();
  }
}
