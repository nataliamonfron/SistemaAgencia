// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { Cliente } from '../../../models/cliente.model';
// import { Pacote } from '../../../models/pacote.model';
// import { Reserva } from '../../../models/reserva.model';

// @Component({
//   selector: 'app-reserva-cadastrar',
//   templateUrl: './reserva-cadastrar.component.html',
//   styleUrl: './reserva-cadastrar.component.css'
// })
// export class ReservaCadastrarComponent {
//   reservaId: number =0;
//   clienteId: number=0;
//   cliente?: Cliente[] = [];
//   pacoteId: number=0;
//   pacote?: Pacote[] = [];
//   numeroPessoas: number=0;
//   status: string ="";
//   criadoEm!: Date;
//   valorTotal: number=0;
// nomeCliente: any;
// pacotes: any;
// email: any;
// cpf: any;
// telefone: any;

//   constructor(
//     private client: HttpClient,
//     private router: Router,
//   ) {}

//   ngOnInit(): void {
//     this.client
//       .get<Pacote[]>("https://localhost:7195/api/pacote/listar")
//       .subscribe({
//         //A requição funcionou
//         next: (pacotes) => {
//           console.table(pacotes);
//           this.pacotes = pacotes;
//         },
//         //A requição não funcionou
//         error: (erro) => {
//           console.log(erro);
//         },
//       });
//   }

//   cadastrar(): void {
//     let reserva: Reserva = {
//       clienteId: this.clienteId,
//       pacoteId: this.pacoteId,
//       numeroPessoas: this.numeroPessoas,
//       status: this.status,
//       criadoEm: this.criadoEm,
//       valorTotal: Number.parseFloat(this.valorTotal),
//       reservaId: 0
//     };

//     this.client
//       .post<Reserva>(
//         "https://localhost:7195/api/reserva/cadastrar",
//         reserva
//       )
//       .subscribe({
//         //A requição funcionou
//         next: (reserva) => {
//           console.log(
//             "Reserva cadastrada com sucesso!!",
            
//           );
//           this.router.navigate(["pages/reserva/listar"]);
//         },
//         //A requição não funcionou
//         error: (erro) => {
//           console.log(erro);
//         },
//       });
//   }


// }


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Cliente } from '../../../models/cliente.model';
import { Pacote } from '../../../models/pacote.model';
import { Reserva } from '../../../models/reserva.model';

@Component({
  selector: 'app-reserva-cadastrar',
  templateUrl: './reserva-cadastrar.component.html',
  styleUrls: ['./reserva-cadastrar.component.css']
})
export class ReservaCadastrarComponent implements OnInit {
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
  ) {}

  ngOnInit(): void {
    // Requisição para listar os pacotes
    this.client
      .get<Pacote[]>("https://localhost:7176/api/pacote/listar")
      .subscribe({
        // Requisição funcionando
        next: (pacotes) => {
          console.table(pacotes);
          this.pacotes = pacotes;
        },
        // Requisição falhou
        error: (erro) => {
          console.log(erro);
        },
      });
  
    // Requisição para listar os clientes
    this.client
      .get<Cliente[]>("https://localhost:7176/api/cliente/listar")
      .subscribe({
        // Requisição funcionando
        next: (clientes) => {
          console.table(clientes);
          this.clientes = clientes;
        },
        // Requisição falhou
        error: (erro) => {
          console.log(erro);
        },
      });
  }

  cadastrar(): void {
    let reserva: Reserva = {
      clienteId: this.clienteId,
      pacoteId: this.pacoteId,
      numeroPessoas: this.numeroPessoas,
      status: this.status,
      criadoEm: this.criadoEm,
      valorTotal: this.valorTotal,
      reservaId: 0,
    };

    this.client
      .post<Reserva>("https://localhost:7176/api/reserva/cadastrar", reserva)
      .subscribe({
        //A requisição funcionou
        next: (reserva) => {
          console.log("Reserva cadastrada com sucesso!!");
          this.router.navigate(["pages/reserva/listar"]);
        },
        //Requisição Falhou
        error: (erro) => {
          console.log(erro);
        },
      });
  }
}

