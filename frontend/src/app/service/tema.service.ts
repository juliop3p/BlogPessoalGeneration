import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tema } from '../model/Tema';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class TemaService {
  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  };

  getAllTemas() {
    return this.http.get('http://localhost:8080/temas', this.token);
  }

  getByIdTema(id: number) {
    return this.http.get(`http://localhost:8080/temas/${id}`, this.token);
  }

  getByNomeTema(tema: string) {
    return this.http.get(
      `http://localhost:8080/temas/nome/${tema}`,
      this.token
    );
  }

  postTema(tema: Tema) {
    return this.http.post('http://localhost:8080/temas', tema, this.token);
  }

  putTema(tema: Tema) {
    return this.http.put(
      `http://localhost:8080/temas/${tema.id}`,
      tema,
      this.token
    );
  }

  deleteTema(id: number) {
    return this.http.delete(`http://localhost:8080/temas/${id}`, this.token);
  }
}
