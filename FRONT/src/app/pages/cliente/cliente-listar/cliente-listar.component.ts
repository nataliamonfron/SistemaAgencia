import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Cliente } from '../../../models/cliente.model';


@Component({
  selector: 'app-cliente-listar',
  templateUrl: './cliente-listar.component.html',
  styleUrls: ['./cliente-listar.component.css'],
})

export class ClienteListarComponent {
  colunasTabela: string [] = [
    "id",
    "nome",
    "email",
    "cpf",
    "telefone",
    "alterar",
    "deletar",
  ];
  clientes : Cliente[] = [];

  constructor(
    private client: HttpClient) {}

  ngOnInit(): void {

  this.client.get<Cliente[]>("https://localhost:7176/api/cliente/listar")
    .subscribe({
    //Requisição com sucesso
      next: (clientes) => {
        console.table(clientes);
        this.clientes = clientes;
        
      },
      //Requisição com erro
      error: (erro) => {
        console.log(erro);
      },
    });
  }
  
  deletar(clienteId: number) {
    this.client
    .delete<Cliente[]>(
      `https://localhost:7176/api/cliente/deletar/${clienteId}`
    )
    .subscribe({
      //A requisição funcionou
      next: (clientes) => {
        this.clientes = clientes;
      },
      //Falhou
      error: (erro) => {
        console.log(erro);
      },
    });
  }

}
