import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Ticket } from '../../models/ticket.model';
import QRCode from 'qrcode';
import { TicketQrDialog } from './ticket-qr-dialog.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatChipsModule,
    MatDividerModule,
    MatDialogModule
  ],
  template: `
    <mat-toolbar color="primary" class="toolbar">
      <button mat-icon-button (click)="goToEvents()">
        <mat-icon>arrow_back</mat-icon>
      </button>
      <span>Meus Ingressos</span>
      <span class="spacer"></span>
      <button mat-button (click)="logout()">
        <mat-icon>logout</mat-icon>
        Sair
      </button>
    </mat-toolbar>

    <div class="profile-container">
      <div class="user-info">
        <mat-card>
          <mat-card-content>
            <div class="user-avatar">
              <mat-icon>account_circle</mat-icon>
            </div>
            <h2>{{ currentUser?.name }}</h2>
            <p>{{ currentUser?.email }}</p>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="tickets-section" *ngIf="upcomingTickets.length > 0">
        <h2 class="section-title">Próximos Eventos</h2>
        <div class="tickets-grid">
          <mat-card *ngFor="let ticket of upcomingTickets" class="ticket-card" (click)="showTicketQR(ticket)">
            <div class="ticket-header">
              <mat-chip-listbox>
                <mat-chip-option [disabled]="true" color="primary">{{ ticket.categoria }}</mat-chip-option>
              </mat-chip-listbox>
            </div>
            <mat-card-content>
              <h3 class="ticket-title">{{ ticket.eventoTitulo }}</h3>
              <p class="ticket-date">
                <mat-icon>event</mat-icon>
                {{ ticket.eventoData | date:"dd/MM/yyyy HH:mm" }}
              </p>
              <p class="ticket-location">
                <mat-icon>location_on</mat-icon>
                {{ ticket.eventoLocal }}
              </p>
              <mat-divider></mat-divider>
              <div class="ticket-details">
                <div class="detail-item">
                  <span>Assento</span>
                  <strong>{{ ticket.assento }}</strong>
                </div>
                <div class="detail-item">
                  <span>Valor</span>
                  <strong>{{ ticket.preco | currency:"BRL" }}</strong>
                </div>
              </div>
            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button color="primary">
                <mat-icon>qr_code</mat-icon>
                Ver Ingresso
              </button>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>

      <div class="tickets-section past" *ngIf="pastTickets.length > 0">
        <h2 class="section-title">Eventos Passados</h2>
        <div class="tickets-grid past">
          <mat-card *ngFor="let ticket of pastTickets" class="ticket-card past">
            <mat-card-content>
              <h3 class="ticket-title">{{ ticket.eventoTitulo }}</h3>
              <p class="ticket-date past">
                <mat-icon>event</mat-icon>
                {{ ticket.eventoData | date:"dd/MM/yyyy" }}
              </p>
              <p class="ticket-location">
                <mat-icon>location_on</mat-icon>
                {{ ticket.eventoLocal }}
              </p>
              <mat-divider></mat-divider>
              <div class="ticket-details">
                <div class="detail-item">
                  <span>Assento</span>
                  <strong>{{ ticket.assento }}</strong>
                </div>
                <div class="detail-item">
                  <span>Categoria</span>
                  <strong>{{ ticket.categoria }}</strong>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>

      <div class="no-tickets" *ngIf="upcomingTickets.length === 0 && pastTickets.length === 0">
        <mat-icon>confirmation_number</mat-icon>
        <p>Você ainda não possui ingressos</p>
        <button mat-raised-button color="primary" (click)="goToEvents()">Ver eventos</button>
      </div>
    </div>
  `,
  styles: [`
    .toolbar {
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .profile-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .user-info {
      margin-bottom: 32px;
    }
    .user-avatar {
      display: flex;
      justify-content: center;
      margin-bottom: 16px;
    }
    .user-avatar mat-icon {
      font-size: 80px;
      width: 80px;
      height: 80px;
      color: #6750A4;
    }
    .user-info h2 {
      text-align: center;
      margin: 0 0 8px;
    }
    .user-info p {
      text-align: center;
      color: #5f6368;
      margin: 0;
    }
    .section-title {
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 16px;
      color: #1C1B1F;
    }
    .tickets-section.past .section-title {
      color: #5f6368;
    }
    .tickets-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
    }
    .tickets-grid.past {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
    .ticket-card {
      cursor: pointer;
      transition: transform 0.2s ease;
    }
    .ticket-card:hover {
      transform: translateY(-4px);
    }
    .ticket-card.past {
      opacity: 0.7;
      cursor: default;
    }
    .ticket-card.past:hover {
      transform: none;
    }
    .ticket-header {
      padding: 12px;
      background: #EADDFF;
    }
    .ticket-title {
      font-size: 18px;
      font-weight: 500;
      margin: 12px 0 8px;
    }
    .ticket-date {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #6750A4;
      font-weight: 500;
      margin: 8px 0;
    }
    .ticket-date.past {
      color: #9aa0a6;
    }
    .ticket-date mat-icon {
      font-size: 18px;
    }
    .ticket-location {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #5f6368;
      font-size: 14px;
      margin: 8px 0;
    }
    .ticket-location mat-icon {
      font-size: 18px;
    }
    .ticket-details {
      display: flex;
      justify-content: space-between;
      padding-top: 12px;
    }
    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .detail-item span {
      font-size: 12px;
      color: #5f6368;
    }
    .detail-item strong {
      font-size: 16px;
    }
    .no-tickets {
      text-align: center;
      padding: 64px 24px;
      color: #5f6368;
    }
    .no-tickets mat-icon {
      font-size: 80px;
      width: 80px;
      height: 80px;
      margin-bottom: 16px;
    }
    .no-tickets p {
      font-size: 18px;
      margin-bottom: 24px;
    }
  `]
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  private dataService = inject(DataService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  currentUser = this.authService.currentUser();
  upcomingTickets: Ticket[] = [];
  pastTickets: Ticket[] = [];

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    const allTickets = this.dataService.getUserTickets();
    const now = new Date();

    this.upcomingTickets = allTickets.filter(t => new Date(t.eventoData) >= now);
    this.pastTickets = allTickets.filter(t => new Date(t.eventoData) < now);
  }

  async showTicketQR(ticket: Ticket): Promise<void> {
    // Generate QR Code as data URL
    let qrCodeDataUrl = '';
    try {
      qrCodeDataUrl = await QRCode.toDataURL(ticket.qrCode || ticket.idCompra, {
        width: 200,
        margin: 2
      });
    } catch (err) {
      console.error('Error generating QR code:', err);
    }

    this.dialog.open(TicketQrDialog, {
      data: { ...ticket, qrCodeImage: qrCodeDataUrl },
      maxWidth: '400px',
      width: '100%'
    });
  }

  goToEvents(): void {
    this.router.navigate(['/events']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

