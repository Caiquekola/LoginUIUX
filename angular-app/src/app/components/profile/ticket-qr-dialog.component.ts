import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ticket-qr-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="ticket-dialog">
      <div class="dialog-header">
        <button mat-icon-button (click)="close()">
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <div class="ticket-digital">
        <div class="qr-code">
          <img [src]="data.qrCodeImage" alt="QR Code do Ingresso">
        </div>
        <h2>{{ data.eventoTitulo }}</h2>
        <p class="dialog-date">{{ data.eventoData | date:"dd/MM/yyyy HH:mm" }}</p>
        <p class="dialog-location">{{ data.eventoLocal }}</p>
        <div class="dialog-details">
          <div class="dialog-detail">
            <span>Assento</span>
            <strong>{{ data.assento }}</strong>
          </div>
          <div class="dialog-detail">
            <span>Categoria</span>
            <strong>{{ data.categoria }}</strong>
          </div>
        </div>
        <div class="dialog-id">
          <span>ID: {{ data.idCompra }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ticket-dialog {
      padding: 0;
    }
    .dialog-header {
      display: flex;
      justify-content: flex-end;
      padding: 8px;
    }
    .ticket-digital {
      background: linear-gradient(135deg, #6750A4 0%, #9a82db 100%);
      color: white;
      padding: 24px;
      text-align: center;
      margin: -8px;
    }
    .qr-code {
      background: white;
      padding: 16px;
      border-radius: 12px;
      display: inline-block;
      margin-bottom: 16px;
    }
    .qr-code img {
      width: 180px;
      height: 180px;
    }
    .ticket-digital h2 {
      font-size: 20px;
      margin: 16px 0 8px;
    }
    .dialog-date {
      font-size: 16px;
      margin: 8px 0;
    }
    .dialog-location {
      font-size: 14px;
      opacity: 0.9;
      margin: 8px 0;
    }
    .dialog-details {
      display: flex;
      justify-content: center;
      gap: 32px;
      margin: 24px 0 16px;
    }
    .dialog-detail {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .dialog-detail span {
      font-size: 12px;
      opacity: 0.8;
    }
    .dialog-detail strong {
      font-size: 18px;
    }
    .dialog-id {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid rgba(255,255,255,0.2);
      font-size: 12px;
      opacity: 0.7;
    }
  `]
})
export class TicketQrDialog {
  constructor(
    public dialogRef: MatDialogRef<TicketQrDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
