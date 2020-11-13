import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { AuthService } from './../service/auth.service';
import { UserLogin } from './../model/UserLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userLogin: UserLogin = new UserLogin();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  entrar() {
    this.authService.logar(this.userLogin).subscribe((resp: UserLogin) => {
      this.userLogin = resp;
      environment.token = this.userLogin.token;
      this.router.navigate(['/feed']);
    });
  }
}
