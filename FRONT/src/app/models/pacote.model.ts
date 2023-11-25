
export interface Pacote {
    
    pacoteId?: number;
    nomePacote: string;
    origem: string;
    destino: string;
    valor: number;
    dataPartida: Date;
    dataRetorno: Date;
    vagasDisponiveis: number;
    
}