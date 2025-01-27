import { PostagemService } from './../service/postagem.service';
import { Postagem } from './../model/Postagem';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faWindows } from '@fortawesome/free-brands-svg-icons';
import { AlertasService } from '../services/alertas.service';

@Component({
  selector: 'app-delete-postagem',
  templateUrl: './delete-postagem.component.html',
  styleUrls: ['./delete-postagem.component.css'],
})
export class DeletePostagemComponent implements OnInit {
  postagem: Postagem = new Postagem();

  constructor(
    private postagemService: PostagemService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertasService
  ) {}

  ngOnInit(): void {
    window.scroll(0, 0);
    let id: number = this.route.snapshot.params['id'];
    this.findByIdPostagem(id);
  }

  findByIdPostagem(id: number) {
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp;
    });
  }

  btnSim() {
    this.postagemService.deletePostagem(this.postagem.id).subscribe(() => {
      this.router.navigate(['/feed']);
      this.alert.showAlertSuccess('Postagem apagada com sucesso!');
    });
  }

  btnNao() {
    this.router.navigate(['/feed']);
  }
}
