import { Injectable } from '@angular/core';
import { Event, Seat } from '../models/event.model';
import { Ticket, CartItem } from '../models/ticket.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private events: Event[] = [];
  private tickets: Ticket[] = [];
  private cart: CartItem[] = [];

  constructor(private authService: AuthService) {
    this.initializeData();
  }

  private initializeData(): void {
    // Load events from storage or use mock
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      this.events = JSON.parse(storedEvents);
    } else {
      this.events = this.getMockEvents();
      this.saveEvents();
    }

    // Load tickets from storage
    const storedTickets = localStorage.getItem('tickets');
    if (storedTickets) {
      this.tickets = JSON.parse(storedTickets);
    } else {
      this.tickets = this.getMockTickets();
      this.saveTickets();
    }
  }

  private getMockEvents(): Event[] {
    return [
      {
        id: 1,
        titulo: 'Workshop de Sistemas de Informação (WSI)',
        data: '2026-05-15T19:00:00',
        local: 'Auditório Principal - IFMG',
        descricao: 'Explorando as fronteiras da IHC e IA. Um evento imperdível para estudantes e profissionais da área de tecnologia, com palestras, workshops e networking.',
        imagem: '/assets/images/wsi.png',
        categoria: 'Acadêmico',
        categorias: [
          { id: 'std', nome: 'Normal', preco: 50.00 },
          { id: 'vip', nome: 'Área VIP', preco: 120.00 }
        ],
        mapaAssentos: this.generateSeatMap(4, 5, ['vip', 'vip', null, 'std', 'std'])
      },
      {
        id: 2,
        titulo: 'Festival Barreiros Rievers - Edição de Inverno',
        data: '2026-07-20T20:00:00',
        local: 'Praça de Eventos',
        descricao: 'Música, arte e gastronomia com artistas locais e atrações nacionais. Uma noite inesquecível com shows, food trucks e muito entretenimento.',
        imagem: '/assets/images/festivalBarreiro.jpg',
        categoria: 'Música',
        categorias: [
          { id: 'std', nome: 'Pista', preco: 80.00 },
          { id: 'vip', nome: 'Camarote', preco: 200.00 }
        ],
        mapaAssentos: this.generateSeatMap(3, 7, ['vip', 'vip', 'vip', null, 'std', 'std', 'std'])
      },
      {
        id: 3,
        titulo: 'Campeonato de Robótica: Mini Sumô 500g',
        data: '2025-10-10T14:00:00',
        local: 'Ginásio Poliesportivo',
        descricao: 'A maior batalha de robôs da região. Venha torcer pela sua equipe favorita e veja a tecnologia em ação!',
        imagem: '/assets/images/robotica.jpg',
        categoria: 'Robótica',
        categorias: [
          { id: 'std', nome: 'Arquibancada', preco: 20.00 }
        ],
        mapaAssentos: this.generateSeatMap(2, 5, ['std', 'std', null, 'std', 'std'])
      },
      {
        id: 4,
        titulo: 'Feira de Ciências e Tecnologia',
        data: '2026-06-10T09:00:00',
        local: 'Laboratórios IFMG',
        descricao: 'Exposição de projetos científicos desenvolvidos pelos alunos. Descubra as inovações que estão transformando o mundo!',
        imagem: 'assets/images/robotica.jpg',
        categoria: 'Ciência',
        categorias: [
          { id: 'std', nome: 'Entrada', preco: 15.00 }
        ],
        mapaAssentos: this.generateSeatMap(2, 4, ['std', 'std', null, 'std'])
      }
    ];
  }

  private generateSeatMap(rows: number, cols: number, pattern: (string | null)[]): (Seat | null)[][] {
    const map: (Seat | null)[][] = [];
    
    for (let r = 0; r < rows; r++) {
      const row: (Seat | null)[] = [];
      for (let c = 0; c < cols; c++) {
        const categoryPattern = pattern[c % pattern.length];
        if (categoryPattern === null) {
          row.push(null); // Corredor
        } else {
          const label = `${String.fromCharCode(65 + r)}${c + 1}`;
          const occupied = Math.random() < 0.2; // 20% chance de estar ocupado
          row.push({
            label,
            row: r,
            col: c,
            disponivel: !occupied,
            categoriaId: categoryPattern,
            selected: false
          });
        }
      }
      map.push(row);
    }
    
    return map;
  }

  private getMockTickets(): Ticket[] {
    return [
      {
        idCompra: 'ABC-123',
        eventoId: 3,
        eventoTitulo: 'Campeonato de Robótica: Mini Sumô 500g',
        eventoData: '2025-10-10T14:00:00',
        eventoLocal: 'Ginásio Poliesportivo',
        categoria: 'Arquibancada',
        assento: 'A1',
        preco: 20.00,
        dataCompra: '2025-09-15',
        qrCode: '',
        usuarioId: 1
      }
    ];
  }

  private saveEvents(): void {
    localStorage.setItem('events', JSON.stringify(this.events));
  }

  private saveTickets(): void {
    localStorage.setItem('tickets', JSON.stringify(this.tickets));
  }

  // Events
  getEvents(): Event[] {
    return this.events;
  }

  getEventById(id: number): Event | undefined {
    return this.events.find(e => e.id === id);
  }

  getUpcomingEvents(): Event[] {
    const now = new Date();
    return this.events
      .filter(e => new Date(e.data) >= now)
      .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
  }

  getPastEvents(): Event[] {
    const now = new Date();
    return this.events
      .filter(e => new Date(e.data) < now)
      .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
  }

  // Cart
  addToCart(item: CartItem): void {
    this.cart.push(item);
  }

  removeFromCart(index: number): void {
    this.cart.splice(index, 1);
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  clearCart(): void {
    this.cart = [];
  }

  getCartTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.preco, 0);
  }

  // Tickets
  getUserTickets(): Ticket[] {
    const user = this.authService.currentUser();
    if (!user) return [];
    
    return this.tickets
      .filter(t => t.usuarioId === user.id)
      .sort((a, b) => new Date(b.eventoData).getTime() - new Date(a.eventoData).getTime());
  }

  purchaseTickets(): Ticket[] {
    const user = this.authService.currentUser();
    if (!user) return [];

    const newTickets: Ticket[] = [];
    
    this.cart.forEach(item => {
      const ticket: Ticket = {
        idCompra: this.generateId(),
        eventoId: item.eventoId,
        eventoTitulo: item.eventoTitulo,
        eventoData: this.events.find(e => e.id === item.eventoId)?.data || '',
        eventoLocal: this.events.find(e => e.id === item.eventoId)?.local || '',
        categoria: item.categoria.nome,
        assento: item.assento,
        preco: item.preco,
        dataCompra: new Date().toISOString(),
        qrCode: '',
        usuarioId: user.id
      };
      
      // Generate QR Code data
      ticket.qrCode = JSON.stringify({
        id: ticket.idCompra,
        evento: ticket.eventoTitulo,
        assento: ticket.assento,
        categoria: ticket.categoria,
        usuario: user.name
      });
      
      this.tickets.push(ticket);
      
      // Mark seat as occupied
      this.markSeatOccupied(item.eventoId, item.assento);
      
      newTickets.push(ticket);
    });

    this.saveTickets();
    this.saveEvents();
    this.clearCart();
    
    return newTickets;
  }

  private generateId(): string {
    return 'TKT-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  private markSeatOccupied(eventId: number, seatLabel: string): void {
    const event = this.events.find(e => e.id === eventId);
    if (!event) return;

    for (const row of event.mapaAssentos) {
      for (const seat of row) {
        if (seat && seat.label === seatLabel) {
          seat.disponivel = false;
          return;
        }
      }
    }
  }
}
