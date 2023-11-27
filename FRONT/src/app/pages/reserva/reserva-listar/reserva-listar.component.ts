import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  MatTable,
  MatTableDataSource,
} from "@angular/material/table";
import { Reserva } from "../../../models/reserva.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-reserva-listar",
  templateUrl: "./reserva-listar.component.html",
  styleUrls: ["./reserva-listar.component.css"],
})
export class ReservaListarComponent {
  colunasTabela: string[] = [
    "id",
    "cliente",
    "pacote",
    "numeroPessoas",
    "status",
    "valorTotal",
    "criadoEm",
    "alterar",
    "deletar",
  ];
  reservas: Reserva[] = [];

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.client
      .get<Reserva[]>("https://localhost:7176/api/reserva/listar")
      .subscribe({
        //Requisição com sucesso
        next: (reservas) => {
          console.table(reservas);
          this.reservas = reservas;
        },
        //Requisição com erro
        error: (erro) => {
          console.log(erro);
        },
      });
  }

  deletar(reservaId: number) {
    this.client
      .delete<Reserva[]>(
        `https://localhost:7176/api/reserva/deletar/${reservaId}`
      )
      .subscribe({
        //Requisição com sucesso
        next: (reservas) => {
          this.reservas = reservas;
          this.router.navigate(["pages/reserva/listar"]);
        },
        //Requisição com erro
        error: (erro) => {
          console.log(erro);
        },
      });
  }
}
