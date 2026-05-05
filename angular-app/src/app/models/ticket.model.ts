export interface Ticket {
  idCompra: string;
  eventoId: number;
  eventoTitulo: string;
  eventoData: string;
  eventoLocal: string;
  categoria: string;
  assento: string;
  preco: number;
  dataCompra: string;
  qrCode: string;
  usuarioId: number;
}

export interface CartItem {
  eventoId: number;
  eventoTitulo: string;
  categoria: Category;
  assento: string;
  preco: number;
}

export interface Category {
  id: string;
  nome: string;
  preco: number;
}
