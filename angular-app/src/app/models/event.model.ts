export interface Category {
  id: string;
  nome: string;
  preco: number;
}

export interface Seat {
  label: string;
  row: number;
  col: number;
  disponivel: boolean;
  categoriaId: string;
  selected?: boolean;
}

export interface Event {
  id: number;
  titulo: string;
  data: string;
  local: string;
  descricao: string;
  imagem: string;
  categoria: string;
  categorias: Category[];
  mapaAssentos: (Seat | null)[][];
}
