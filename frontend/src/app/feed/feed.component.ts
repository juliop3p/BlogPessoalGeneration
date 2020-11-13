import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TemaService } from './../service/tema.service';
import { PostagemService } from './../service/postagem.service';
import { Tema } from './../model/Tema';
import { Postagem } from './../model/Postagem';
import { AlertasService } from '../services/alertas.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  key: 'data';
  reverse = true;

  postagem: Postagem = new Postagem();
  listaPostagens: Postagem[];
  titulo: string;

  tema: Tema = new Tema();
  listaTemas: Tema[];
  idTema: number;
  nomeTema: string;

  constructor(
    private postagemService: PostagemService,
    private temaService: TemaService,
    private alert: AlertasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let token = environment.token;

    if (token === '') {
      this.router.navigate(['/login']);
      this.alert.showAlertDanger('Faça o login antes de entrar no feed...');
      return;
    }

    window.scroll(0, 0);

    this.findAllPostagens();
    this.findAllTemas();
  }

  findAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp;
    });
  }

  publicar() {
    this.tema.id = this.idTema;
    this.postagem.tema = this.tema;

    if (
      this.postagem.titulo == null ||
      this.postagem.texto == null ||
      this.postagem.tema == null
    ) {
      this.alert.showAlertDanger('Preencha todos os campos antes de publicar!');
    } else {
      this.postagemService
        .postPostagem(this.postagem)
        .subscribe((resp: Postagem) => {
          this.postagem = resp;
          this.postagem = new Postagem();
          this.alert.showAlertSuccess('Postagem realizada com sucesso!');
          this.findAllPostagens();
        });
    }
  }

  findAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp;
    });
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;
    });
  }

  findByTituloPostagem() {
    if (this.titulo == '') {
      this.findAllPostagens();
    } else {
      this.postagemService
        .getByTituloPostagem(this.titulo)
        .subscribe((resp: Postagem[]) => {
          this.listaPostagens = resp;
        });
    }
  }

  findByNomeTema() {
    if (this.nomeTema === '') {
      this.findAllTemas();
    } else {
      this.temaService
        .getByNomeTema(this.nomeTema)
        .subscribe((resp: Tema[]) => {
          this.listaTemas = resp;
        });
    }
  }
}
