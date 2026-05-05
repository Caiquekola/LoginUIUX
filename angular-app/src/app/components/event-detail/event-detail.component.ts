import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Event, Seat } from '../../models/event.model';
import { Category } from '../../models/ticket.model';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatToolbarModule,
    MatRadioModule,
    MatSnackBarModule
  ],
  template: `
    <header class="app-header">
      <div class="header-content">
        <button class="icon-btn" (click)="goBack()" aria-label="Voltar">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <h1 class="app-title">{{ event?.titulo }}</h1>
        <button class="icon-btn" (click)="goToProfile()" aria-label="Perfil do Usuário">
          <mat-icon>account_circle</mat-icon>
        </button>
      </div>
    </header>

    <main class="main-container">
      <a href="#event-content" class="skip-link">Pular para o conteúdo principal</a>
      
      <button mat-button class="btn-back" (click)="goBack()">
        <mat-icon>arrow_back</mat-icon>
        Voltar para Eventos
      </button>

      <section id="event-content" class="event-details-section" *ngIf="event">
        <div class="event-hero">
          <img [src]="event.imagem" [alt]="event.titulo" class="event-hero-image"
               onerror="this.src='assets/images/fallback.jpg'">
          <div class="event-hero-overlay">
            <div class="event-hero-content">
              <div class="event-category-badge">
                <mat-icon>{{ getCategoryIcon(event.categoria) }}</mat-icon>
                {{ event.categoria }}
              </div>
              <h1 class="event-hero-title">{{ event.titulo }}</h1>
            </div>
          </div>
        </div>
        
        <div class="event-info-grid">
          <div class="event-info-card">
            <h3 class="info-card-title">
              <mat-icon>event</mat-icon>
              Data e Horário
            </h3>
            <p class="info-card-content">{{ event.data | date:'dd/MM/yyyy HH:mm' }}</p>
          </div>
          
          <div class="event-info-card">
            <h3 class="info-card-title">
              <mat-icon>location_on</mat-icon>
              Localização
            </h3>
            <p class="info-card-content">{{ event.local }}</p>
          </div>
        </div>
        
        <div class="event-description-card">
          <h3 class="info-card-title">
            <mat-icon>description</mat-icon>
            Sobre o Evento
          </h3>
          <p class="event-description-text">{{ event.descricao }}</p>
        </div>
        
        <div class="pricing-section">
          <h3 class="section-title">
            <mat-icon>payments</mat-icon>
            Categorias de Ingresso
          </h3>
          <div class="pricing-grid">
            <div 
              *ngFor="let category of event.categorias" 
              class="pricing-card"
              [class.selected]="selectedCategory?.id === category.id"
              (click)="selectCategory(category)">
              <div class="pricing-header">
                <span class="category-name">{{ category.nome }}</span>
                <span class="category-price">R$ {{ category.preco | number:'1.2-2' }}</span>
              </div>
              <div class="pricing-details">
                <span class="price-per-seat">por assento</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="seat-selection-section" *ngIf="event">
        <div class="section-header">
          <h2 class="section-title">
            <mat-icon>event_seat</mat-icon>
            Selecione seu Assento
          </h2>
          <span class="selected-count" *ngIf="selectedSeats.length > 0">
            {{ selectedSeats.length }} assento(s) selecionado(s)
          </span>
        </div>
        
        <div class="legend-container">
          <div class="legend-item">
            <span class="seat-demo available standard"></span>
            <span>Standard</span>
          </div>
          <div class="legend-item">
            <span class="seat-demo available vip"></span>
            <span>VIP/Camarote</span>
          </div>
          <div class="legend-item">
            <span class="seat-demo occupied"></span>
            <span>Ocupado</span>
          </div>
          <div class="legend-item">
            <span class="seat-demo selected"></span>
            <span>Selecionado</span>
          </div>
        </div>

        <div class="map-container">
          <div class="stage-indicator">
            <mat-icon>stage</mat-icon>
            PALCO
          </div>
          <div id="mapa-container" class="seat-map"></div>
        </div>

        <div class="selection-summary" *ngIf="selectedSeats.length > 0">
          <div class="summary-card">
            <h3 class="summary-title">Resumo da Seleção</h3>
            <div class="summary-content">
              <div class="summary-info">
                <p class="summary-label">Assento(s):</p>
                <p class="summary-value">{{ getSelectedSeatsLabels() }}</p>
              </div>
              <div class="summary-info">
                <p class="summary-label">Categoria:</p>
                <p class="summary-value">{{ selectedCategory?.nome }}</p>
              </div>
              <div class="summary-total">
                <p class="summary-label">Total:</p>
                <p class="summary-total-price">R$ {{ getTotalPrice() | number:'1.2-2' }}</p>
              </div>
            </div>
            <button mat-raised-button color="primary" class="confirm-btn" (click)="addToCart()">
              <mat-icon>shopping_cart</mat-icon>
              Confirmar Reserva
            </button>
          </div>
        </div>
      </section>
    </main>
  `,
  styles: []
})
export class EventDetailComponent implements OnInit {
  event: Event | undefined;
  selectedCategory: Category | null = null;
  selectedSeats: Seat[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Verificar se o usuário está autenticado
    // if (!this.authService.isLoggedIn()) {
    //   this.snackBar.open('Por favor, faça login para acessar esta página', 'Aviso', {
    //     duration: 3000
    //   });
    //   this.router.navigate(['/login']);
    //   return;
    // }

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.event = this.dataService.getEventById(id);
    
    if (!this.event) {
      this.router.navigate(['/events']);
      return;
    }

    // Initialize first category
    if (this.event.categorias.length > 0) {
      this.selectedCategory = this.event.categorias[0];
    }

    // Generate seat map
    setTimeout(() => {
      this.generateSeatMap();
    }, 100);
  }

  generateSeatMap(): void {
    if (!this.event) return;

    const container = document.getElementById('mapa-container');
    if (!container) return;

    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${this.event.mapaAssentos[0].length}, 40px)`;

    this.event.mapaAssentos.forEach((row, r) => {
      row.forEach((seat, c) => {
        if (!seat) {
          // Corredor
          const corridor = document.createElement('div');
          corridor.className = 'corridor';
          corridor.style.width = '20px';
          container.appendChild(corridor);
        } else {
          const seatElement = document.createElement('div');
          seatElement.className = 'seat';
          seatElement.textContent = seat.label;
          
          if (!seat.disponivel) {
            seatElement.classList.add('occupied');
            if (seat.categoriaId === 'vip') {
              seatElement.classList.add('vip');
            }
          } else if (seat.selected) {
            seatElement.classList.add('selected');
            if (seat.categoriaId === 'vip') {
              seatElement.classList.add('vip');
            }
          } else {
            seatElement.classList.add('available');
            if (seat.categoriaId === 'vip') {
              seatElement.classList.add('vip');
            }
          }
          
          seatElement.addEventListener('click', () => this.toggleSeat(seat));
          container.appendChild(seatElement);
        }
      });
    });
  }

  toggleSeat(seat: Seat): void {
    if (!seat.disponivel) return;
    
    // Verifica se o assento pertence à categoria selecionada
    if (this.selectedCategory && seat.categoriaId !== this.selectedCategory.id) {
      this.snackBar.open(`Este assento é da categoria ${seat.categoriaId === 'vip' ? 'VIP/Camarote' : 'Standard'}. Selecione a categoria correta primeiro.`, 'Aviso', {
        duration: 3000
      });
      return;
    }
    
    seat.selected = !seat.selected;
    
    if (seat.selected) {
      this.selectedSeats.push(seat);
    } else {
      const index = this.selectedSeats.indexOf(seat);
      if (index > -1) {
        this.selectedSeats.splice(index, 1);
      }
    }
    
    this.generateSeatMap();
  }

  selectCategory(category: Category): void {
    this.selectedCategory = category;
    // Clear selected seats when changing category
    this.selectedSeats.forEach(seat => seat.selected = false);
    this.selectedSeats = [];
    this.generateSeatMap();
  }

  getTotalPrice(): number {
    if (!this.selectedCategory || this.selectedSeats.length === 0) {
      return 0;
    }
    return this.selectedSeats.length * this.selectedCategory.preco;
  }

  getSelectedSeatsLabels(): string {
    return this.selectedSeats.map(s => s.label).join(', ');
  }

  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'Acadêmico': 'school',
      'Música': 'music_note',
      'Robótica': 'smart_toy',
      'Ciência': 'science',
      'Cultura': 'theater_comedy',
      'Esporte': 'sports_soccer',
      'Tecnologia': 'computer'
    };
    return icons[category] || 'event';
  }

  goBack(): void {
    this.router.navigate(['/events']);
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  addToCart(): void {
    if (this.selectedSeats.length === 0 || !this.selectedCategory) {
      this.snackBar.open('Selecione pelo menos um assento', 'Erro', {
        duration: 3000
      });
      return;
    }

    this.selectedSeats.forEach(seat => {
      this.dataService.addToCart({
        eventoId: this.event!.id,
        eventoTitulo: this.event!.titulo,
        categoria: this.selectedCategory!,
        assento: seat.label,
        preco: this.selectedCategory!.preco
      });
    });

    this.snackBar.open(`${this.selectedSeats.length} ingresso(s) adicionado(s) ao carrinho`, 'Sucesso', {
      duration: 3000
    });

    this.router.navigate(['/checkout']);
  }
}
