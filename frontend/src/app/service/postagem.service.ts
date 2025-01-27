import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Postagem } from './../model/Postagem';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PostagemService {
  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  };

  getAllPostagens() {
    return this.http.get('http://localhost:8080/postagens', this.token);
  }

  postPostagem(postagem: Postagem) {
    return this.http.post(
      'http://localhost:8080/postagens',
      postagem,
      this.token
    );
  }

  getByIdPostagem(id: number) {
    return this.http.get(`http://localhost:8080/postagens/${id}`, this.token);
  }

  getByTituloPostagem(titulo: string) {
    return this.http.get(
      `http://localhost:8080/postagens/titulo/${titulo}`,
      this.token
    );
  }

  putPostagem(postagem: Postagem) {
    return this.http.put(
      `http://localhost:8080/postagens/${postagem.id}`,
      postagem,
      this.token
    );
  }

  deletePostagem(id: number) {
    return this.http.delete(
      `http://localhost:8080/postagens/${id}`,
      this.token
    );
  }
}
