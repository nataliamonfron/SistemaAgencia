import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../../models/cliente.model';
import { Pacote } from '../../../models/pacote.model';
import { Reserva } from '../../../models/reserva.model';

@Component({
  selector: 'app-reserva-alterar',
  templateUrl: './reserva-alterar.component.html',
  styleUrls: ['./reserva-alterar.component.css']
})
export class ReservaAlterarComponent implements OnInit {
  reservaId: number = 0;
  clienteId: number = 0;
  pacoteId: number = 0;
  numeroPessoas: number = 0;
  status: string = "";
  criadoEm!: Date;
  valorTotal: number = 0;
  pacotes: Pacote[] = [];
  clientes: Cliente[] = [];

  constructor(
    private client: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
   
    this.route.params.subscribe( {
      next: (parametros) => {
      let { id } = parametros;
   
    this.client
      .get<Reserva>(`https://localhost:7176/api/reserva/${this.reservaId}`)
      .subscribe({
        next: (reserva) => {
         
          this.clienteId = reserva.clienteId;
          this.pacoteId = reserva.pacoteId;
          this.numeroPessoas = reserva.numeroPessoas;
          this.status = reserva.status;
          this.criadoEm = reserva.criadoEm;
          this.valorTotal = reserva.valorTotal;
        },
        error: (erro) => {
          console.log(erro);
        },
      });

    
    this.client
      .get<Pacote[]>("https://localhost:7176/api/pacote/listar")
      .subscribe({
        next: (pacotes) => {
          console.table(pacotes);
          this.pacotes = pacotes;
        },
        error: (erro) => {
          console.log(erro);
        },
      });
      },
    });
  }

  alterar(): void {
    let reserva: Reserva = {
      reservaId: this.reservaId,
      clienteId: this.clienteId,
      pacoteId: this.pacoteId,
      numeroPessoas: this.numeroPessoas,
      status: this.status,
      criadoEm: this.criadoEm,
      valorTotal: this.valorTotal,
    };

    
    this.client
      .put<Reserva>(`https://localhost:7176/api/reserva/alterar/${this.reservaId}`, reserva)
      .subscribe({
        next: (reserva) => {
          console.log("Reserva alterada com sucesso!!");
          this.router.navigate(["pages/reserva/listar"]);
        },
        error: (erro) => {
          console.log(erro);
        },
      });
  }
}
