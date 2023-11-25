import { Cliente } from './../../../models/cliente.model';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from "@angular/router";
// import { Router } from '@angular/router';
// import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-cliente-alterar',
  templateUrl: './cliente-alterar.component.html',
  styleUrls: ['./cliente-alterar.component.css'], 
})
export class ClienteAlterarComponent {
  clienteId: number = 0;
  nomeCliente: string = "";
  email: string = "";
  cpf: string = "";
  telefone: string = "";

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
          .get<Cliente>(`https://localhost:7195/api/cliente/buscar/${id}`)
          .subscribe({
            next: (cliente) => {
              this.clienteId = cliente.clienteId!;
              this.nomeCliente = cliente.nomeCliente;
              this.email = cliente.email;
              this.cpf = cliente.cpf;
              this.telefone = cliente.telefone;
            },
            error: (erro) => {
              console.log(erro);
            },
          });
      },
    });
  }

alterar(): void {
  let cliente: Cliente = {
    nomeCliente: this.nomeCliente,
    email: this.email,
    cpf: this.cpf,
    telefone: this.telefone,
  };

  console.log(cliente);

  this.client
  .put<Cliente>(`http://localhost:7195/api/cliente/alterar/${this.clienteId}`, 
  cliente)
  .subscribe({
    //A requisição funcionou
    next: (cliente) => {
      console.log("Cliente alterado com sucesso!", cliente);
      this.router.navigate(["pages/cliente/listar"]);
    },
    //A requisição falhou
    error: (erro) => {
      console.log(erro);
    },
  });


}



}


