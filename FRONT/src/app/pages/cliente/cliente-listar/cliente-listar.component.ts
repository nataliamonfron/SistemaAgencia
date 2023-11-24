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
  
  // deletar(clienteId: number) {
  //   this.client
  //   .delete<Cliente[]>{
  //     'https://localhost:7195/api/cliente/deletar/${produtoId}'
  //   }
  //   .subscribe({
  //     //A requisição funcionou
  //     next: (clientes) => {
  //       this.clientes = clientes;
  //       console.log("CLIENTE DELETADO COM SUCESSO!")
  //     }
  //     //Falhou
  //     error: (erro) => {
  //       console.log(erro);
  //     }
  //   })
  // }

}
