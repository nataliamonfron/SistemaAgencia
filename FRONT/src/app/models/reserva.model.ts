import { Cliente } from "./cliente.model";
import { Pacote } from "./pacote.model";

export interface Reserva {
    reservaId: number;
    clienteId: number;
    cliente?: Cliente;
    pacoteId: number;
    pacote?: Pacote;
    numeroPessoas: number;
    status: string;
    criadoEm: Date;
    valorTotal: number;
}