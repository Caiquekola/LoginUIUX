import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule
  ],
  template: `
    <header class="app-header">
      <div class="header-content">
        <h1 class="app-title" (click)="goToEvents()">
          🎫 TicketMaster IFMG
        </h1>
        <button class="icon-btn" (click)="goToProfile()" *ngIf="isLoggedIn()" aria-label="Perfil do Usuário">
          <mat-icon>account_circle</mat-icon>
        </button>
      </div>
    </header>

    <main class="main-container">
      <a href="#events-content" class="skip-link">Pular para o conteúdo principal</a>
      
      <section class="hero-section">
        <div class="hero-content">
          <h2>Bem-vindo ao TicketMaster IFMG</h2>
          <p>Descubra os melhores eventos acadêmicos e culturais</p>
        </div>
      </section>

      <div class="search-container">
        <div class="search-bar">
          <mat-icon class="search-icon">search</mat-icon>
          <input 
            type="text" 
            placeholder="Buscar eventos..." 
            [(ngModel)]="searchTerm" 
            (input)="filterEvents()"
            class="search-input">
        </div>
        
        <div class="filter-actions">
          <button 
            *ngIf="searchTerm || selectedCategory" 
            mat-button 
            (click)="clearFilters()"
            class="clear-btn">
            <mat-icon>clear</mat-icon>
            Limpar filtros
          </button>
        </div>
      </div>

      <div class="chips-container" *ngIf="categories.length > 0">
        <h3 class="filter-title">Categorias</h3>
        <div class="chips-wrapper">
          <button 
            class="chip" 
            *ngFor="let category of categories" 
            [class.active]="selectedCategory === category"
            (click)="selectCategory(category)">
            {{ category }}
          </button>
        </div>
      </div>

      <section id="events-content" class="events-section">
        <div class="section-header">
          <h2 class="section-title">
            <mat-icon>event</mat-icon>
            Próximos Eventos
          </h2>
          <span class="event-count">{{ filteredUpcomingEvents.length }} evento(s)</span>
        </div>
        
        <div class="events-grid" *ngIf="filteredUpcomingEvents.length > 0">
          <div 
            *ngFor="let event of filteredUpcomingEvents; trackBy: trackByEventId" 
            class="event-card fade-in" 
            (click)="selectEvent(event.id)">
            
            <div class="event-image-container">
              <img 
                [src]="event.imagem" 
                [alt]="event.titulo" 
                class="event-image"
                onerror="this.src='assets/images/fallback.jpg'">
              <div class="event-category">
                <mat-icon>{{ getCategoryIcon(event.categoria) }}</mat-icon>
                {{ event.categoria }}
              </div>
            </div>
            
            <div class="event-content">
              <div class="event-header">
                <h3 class="event-title">{{ event.titulo }}</h3>
                <div class="event-price">
                  <span class="price-label">A partir de</span>
                  <span class="price-value">R$ {{ getMinPrice(event) | number:'1.2-2' }}</span>
                </div>
              </div>
              
              <div class="event-meta">
                <div class="event-info">
                  <mat-icon>event</mat-icon>
                  <span>{{ event.data | date:'dd/MM/yyyy HH:mm' }}</span>
                </div>
                <div class="event-info">
                  <mat-icon>location_on</mat-icon>
                  <span>{{ event.local }}</span>
                </div>
              </div>
              
              <p class="event-description">{{ event.descricao | slice:0:120 }}{{ event.descricao.length > 120 ? '...' : '' }}</p>
              
              <div class="event-footer">
                <button mat-button class="view-details-btn">
                  Ver Detalhes
                  <mat-icon>arrow_forward</mat-icon>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="empty-state" *ngIf="filteredUpcomingEvents.length === 0">
          <mat-icon class="empty-icon">event_busy</mat-icon>
          <h3>Nenhum evento encontrado</h3>
          <p>Tente ajustar seus filtros ou buscar por outros termos</p>
          <button mat-raised-button (click)="clearFilters()" color="primary">
            <mat-icon>refresh</mat-icon>
            Limpar filtros
          </button>
        </div>
      </section>

      <section class="events-section past-events" *ngIf="pastEvents.length > 0">
        <div class="section-header">
          <h2 class="section-title">
            <mat-icon>history</mat-icon>
            Eventos Passados
          </h2>
          <span class="event-count">{{ filteredPastEvents.length }} evento(s)</span>
        </div>
        
        <div class="events-grid past-grid">
          <div 
            *ngFor="let event of filteredPastEvents; trackBy: trackByEventId" 
            class="event-card past-event fade-in" 
            (click)="selectEvent(event.id)">
            
            <div class="event-image-container">
              <img 
                [src]="event.imagem" 
                [alt]="event.titulo" 
                class="event-image past-image">
              <div class="event-category past-category">
                <mat-icon>{{ getCategoryIcon(event.categoria) }}</mat-icon>
                {{ event.categoria }}
              </div>
            </div>
            
            <div class="event-content">
              <div class="event-header">
                <h3 class="event-title">{{ event.titulo }}</h3>
                <div class="event-price past-price">
                  <span class="price-label">Encerrado</span>
                </div>
              </div>
              
              <div class="event-meta">
                <div class="event-info">
                  <mat-icon>event</mat-icon>
                  <span>{{ event.data | date:'dd/MM/yyyy' }}</span>
                </div>
                <div class="event-info">
                  <mat-icon>location_on</mat-icon>
                  <span>{{ event.local }}</span>
                </div>
              </div>
              
              <p class="event-description">{{ event.descricao | slice:0:100 }}...</p>
              
              <div class="event-footer">
                <button mat-button disabled class="view-details-btn">
                  Evento Encerrado
                  <mat-icon>block</mat-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  `,
  styles: []
})
export class EventsComponent implements OnInit {
  upcomingEvents: Event[] = [];
  pastEvents: Event[] = [];
  filteredUpcomingEvents: Event[] = [];
  filteredPastEvents: Event[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  categories: string[] = [];

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.upcomingEvents = this.dataService.getUpcomingEvents();
    this.pastEvents = this.dataService.getPastEvents();
    this.categories = [...new Set(this.upcomingEvents.map(e => e.categoria))];
    this.filteredUpcomingEvents = [...this.upcomingEvents];
    this.filteredPastEvents = [...this.pastEvents];
  }

  filterEvents(): void {
    this.filteredUpcomingEvents = this.upcomingEvents.filter(event => {
      const matchesSearch = !this.searchTerm || 
        event.titulo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        event.descricao.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        event.local.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = !this.selectedCategory || 
        event.categoria === this.selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    this.filteredPastEvents = this.pastEvents.filter(event => {
      const matchesSearch = !this.searchTerm || 
        event.titulo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        event.descricao.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        event.local.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = !this.selectedCategory || 
        event.categoria === this.selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }

  selectCategory(category: string): void {
    this.selectedCategory = this.selectedCategory === category ? '' : category;
    this.filterEvents();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.filterEvents();
  }

  selectEvent(eventId: number): void {
    console.log("isLoggedIn:",this.authService.isLoggedIn());
    if (!this.authService.isLoggedIn()) {
      this.snackBar.open('Por favor, faça login para ver detalhes do evento', 'Aviso', {
        duration: 3000
      });
      this.router.navigate(['/login']);
      return;
    }
    console.log("Navigating to event:", eventId);
    this.router.navigate(['/event', eventId]);
  }

  goToEvents(): void {
    // Recarrega a página atual
    this.router.navigate(['/events']);
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getMinPrice(event: Event): number {
    if (!event.categorias || event.categorias.length === 0) {
      return 0;
    }
    return Math.min(...event.categorias.map(cat => cat.preco));
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

  trackByEventId(index: number, event: Event): number {
    return event.id;
  }
}
