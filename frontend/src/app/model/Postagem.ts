import { Tema } from './Tema';

export class Postagem {
  public id: number;
  public titulo: string;
  public text: string;
  public data: Date;
  public tema: Tema;
}
