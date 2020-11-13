import { AlertasService } from './../services/alertas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostagemService } from './../service/postagem.service';
import { TemaService } from './../service/tema.service';
import { Component, OnInit } from '@angular/core';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';

@Component({
  selector: 'app-put-postagem',
  templateUrl: './put-postagem.component.html',
  styleUrls: ['./put-postagem.component.css'],
})
export class PutPostagemComponent implements OnInit {
  postagem: Postagem = new Postagem();
  idPost: number;
  tema: Tema = new Tema();
  listaTemas: Tema[];
  idTema: number;

  constructor(
    private temaService: TemaService,
    private postagemService: PostagemService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertasService
  ) {}

  ngOnInit(): void {
    window.scroll(0, 0);
    this.idPost = this.route.snapshot.params['id'];
    this.findByIdPostagem(this.idPost);

    this.findAllTemas();
  }

  findByIdPostagem(id: number) {
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp;
    });
  }

  salvar() {
    this.tema.id = this.idTema;
    this.postagem.tema = this.tema;

    this.postagemService.putPostagem(this.postagem).subscribe(
      (resp: Postagem) => {
        this.postagem = resp;
        this.router.navigate(['/feed']);
        this.alert.showAlertSuccess('Postagem alterada com sucesso!');
      },
      (err) => {
        console.log(err.status);
        if (err.status === 500) {
          this.alert.showAlertDanger(
            'Preencha todos os campos corretamente antes de enviar!'
          );
        }
      }
    );
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
}
