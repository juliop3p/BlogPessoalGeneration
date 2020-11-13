import { Component, OnInit } from '@angular/core';
import { User } from './../model/User';
import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { AlertasService } from '../services/alertas.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  user: User = new User();
  senha: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alert: AlertasService
  ) {}

  ngOnInit(): void {}

  conferirSenha(event: any) {
    this.senha = event.target.value;
  }

  cadastrar() {
    if (this.senha === this.user.senha) {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp;
        this.router.navigate(['/login']);
        this.alert.showAlertSuccess('Usuário cadastrado com sucesso!');
      });
    } else {
      this.alert.showAlertDanger('Senhas não conferem!');
    }
  }
}
