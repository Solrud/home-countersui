import {Component, inject, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../data/service/Auth/auth.service";
import {ToastService} from "../../data/service/Toast/toast.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{
  fgAuth: FormGroup;

  constructor(private authService: AuthService,
              private routerService: Router,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.initFgAuth();
  }

  initFgAuth(){
    this.fgAuth = new FormGroup({
      password: new FormControl({value: null, disabled: false}, Validators.required)
    })
  }

  onClickLogin(){
    const password = this.fgAuth.get('password').value;

    this.authService.login$(password).subscribe(result => {
      if (result){
        localStorage.setItem('access_token', result);
        this.toastService.showPositive('Добро пожаловать!');
        this.routerService.navigate(['/']);
      } else {
        this.toastService.showWarning('Неправильный пароль');
      }
    }, error => {
      if(error.statusText == 'TOO MANY REQUESTS'){
        this.toastService.showWarning('Слишком много попыток вход! Повторите позже!');
      }
      else {
        this.toastService.showWarning('Неизвестная ошибка сервера');
      }
    })
  }
}
