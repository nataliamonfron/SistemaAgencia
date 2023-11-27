import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../../models/cliente.model';
import { Pacote } from '../../../models/pacote.model';
import { Reserva } from '../../../models/reserva.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reserva-alterar',
  templateUrl: './reserva-alterar.component.html',
  styleUrls: ['./reserva-alterar.component.css']
})
export class ReservaAlterarComponent {
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
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (parametros) => {
        let { id } = parametros;
  
        this.client
          .get<Reserva>(
            `https://localhost:7176/api/reserva/buscar/${id}`
          )
          .subscribe({
            next: (reserva) => {
              // p bter os pacotes
              this.client
                .get<Pacote[]>(
                  "https://localhost:7176/api/pacote/listar"
                )
                .subscribe({
                  next: (pacotes) => {
                    this.pacotes = pacotes;
  
                    // p obter os clientes
                    this.client
                      .get<Cliente[]>(
                        "https://localhost:7176/api/cliente/listar"
                      )
                      .subscribe({
                        next: (clientes) => {
                          this.clientes = clientes;
  
                          
                          this.reservaId = reserva.reservaId!;
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
                  },
                  error: (erro) => {
                    console.log(erro);
                  },
                });
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
          this.openSnackBar('Erro ao alterar a reserva.');
        },
      });
  }
  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000, 
    });
}
}
