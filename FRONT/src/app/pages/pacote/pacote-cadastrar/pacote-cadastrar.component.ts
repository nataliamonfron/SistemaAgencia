import { Pacote } from './../../../models/pacote.model';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pacote-cadastrar',
  templateUrl: './pacote-cadastrar.component.html',
  styleUrls: ['./pacote-cadastrar.component.css'], 
})

export class PacoteCadastrarComponent {
  
    nomePacote: string = "";
    origem: string= "";
    destino: string= "";
    valor: number= 0;
    dataPartida!: Date;
    dataRetorno!: Date;
    vagasDisponiveis: number =0;


constructor(
  private client: HttpClient,
  private router: Router,
) {}

  cadastrar(): void {
  let pacote: Pacote = {
    nomePacote: this.nomePacote,
    origem: this.origem,
    destino: this.destino,
    valor: this.valor,
    dataPartida: this.dataPartida,
    dataRetorno: this.dataRetorno,
    vagasDisponiveis: this.vagasDisponiveis
  };

  this.client
    .post<Pacote>(
      "https://localhost:7176/api/pacote/cadastrar",
      pacote
    )
    .subscribe({
      //A requição funcionou
      next: (pacote) => {
        console.log("Pacote cadastro com sucesso:", pacote);
        this.router.navigate(["pages/pacote/listar"]);
      },
      //A requição não funcionou
      error: (erro) => {
        console.log(erro);
      },
    });
}
}


