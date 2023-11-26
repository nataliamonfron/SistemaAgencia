import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Pacote } from '../../../models/pacote.model';


@Component({
  selector: 'app-pacote-listar',
  templateUrl: './pacote-listar.component.html',
  styleUrls: ['./pacote-listar.component.css'],
})

export class PacoteListarComponent {
  colunasTabela: string [] = [
    "id",
    "nome",
    "origem",
    "destino",
    "valor",
    "dataPartida",
    "dataRetorno",
    "alterar",
    "deletar",
  ];
  pacotes : Pacote[] = [];

  constructor(
    private client: HttpClient) {}

  ngOnInit(): void {

  this.client.get<Pacote[]>("https://localhost:7176/api/pacote/listar")
    .subscribe({
    //Requisição com sucesso
      next: (pacotes) => {
        console.table(pacotes);
        this.pacotes = pacotes;
        
      },
      //Requisição com erro
      error: (erro) => {
        console.log(erro);
      },
    });
  }
  
  deletar(pacoteId: number) {
    this.client
    .delete<Pacote[]>(
      `https://localhost:7176/api/pacote/deletar/${pacoteId}`
    )
    .subscribe({
      //A requisição funcionou
      next: (pacotes) => {
        this.pacotes = pacotes;
      },
      //Falhou
      error: (erro) => {
        console.log(erro);
      },
    });
  }

}

