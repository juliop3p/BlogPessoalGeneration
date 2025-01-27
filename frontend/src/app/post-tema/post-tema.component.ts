import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemaService } from './../service/tema.service';
import { Tema } from '../model/Tema';
import { AlertasService } from '../services/alertas.service';

@Component({
  selector: 'app-post-tema',
  templateUrl: './post-tema.component.html',
  styleUrls: ['./post-tema.component.css'],
})
export class PostTemaComponent implements OnInit {
  constructor(
    private temaService: TemaService,
    private router: Router,
    private alert: AlertasService
  ) {}

  tema: Tema = new Tema();
  listaTemas: Tema[];

  ngOnInit() {
    this.findAllTemas();
  }

  findAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp;
    });
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.tema.id).subscribe((resp: Tema) => {
      this.tema = resp;
    });
  }

  cadastrar() {
    if (this.tema.descricao == null) {
      this.alert.showAlertDanger(
        'Preencha o compo de nome do tema corretamente!'
      );
    } else {
      this.temaService.postTema(this.tema).subscribe((resp: Tema) => {
        this.tema = resp;
        this.router.navigate(['/feed']);
        this.alert.showAlertSuccess('Tema cadastrado com sucesso!');
      });
    }
  }
}
