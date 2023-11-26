import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from "@angular/router";
import { Pacote } from '../../../models/pacote.model';



@Component({
  selector: 'app-pacote-alterar',
  templateUrl: './pacote-alterar.component.html',
  styleUrls: ['./pacote-alterar.component.css'], 
})
export class PacoteAlterarComponent {
    pacoteId?: number;
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
      private route: ActivatedRoute
    ) {}
  
    ngOnInit(): void {
      this.route.params.subscribe({
        next: (parametros) => {
          let { id } = parametros;
          this.client
            .get<Pacote>(`https://localhost:7176/api/pacote/buscar/${id}`)
            .subscribe({
              next: (pacote) => {
                this.pacoteId = pacote.pacoteId!;
                this.nomePacote = pacote.nomePacote;
                this.origem = pacote.origem;
                this.destino = pacote.destino;
                this.valor = pacote.valor;
                this.dataPartida = pacote.dataPartida;
                this.dataRetorno = pacote.dataRetorno;
                this.vagasDisponiveis = pacote.vagasDisponiveis;
              },
              error: (erro) => {
                console.log(erro);
              },
            });
        },
      });
    }
  
  alterar(): void {
    let pacote: Pacote = {
      nomePacote: this.nomePacote,
      origem: this.origem,
      destino: this.destino,
      valor: this.valor,
      dataPartida: this.dataPartida,
      dataRetorno: this.dataRetorno,
      vagasDisponiveis: this.vagasDisponiveis
    };
  
    console.log(pacote);
  
    this.client
    .put<Pacote>(`https://localhost:7176/api/pacote/alterar/${this.pacoteId}`, 
    pacote)
    .subscribe({
      //A requisição funcionou
      next: (pacote) => {
        
        this.router.navigate(["pages/pacote/listar"]);
      },
      //A requisição falhou
      error: (erro) => {
        console.log(erro);
      },
    });
  
  
  }
  


}
