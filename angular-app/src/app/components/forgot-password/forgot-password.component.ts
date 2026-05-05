import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule
  ],
  template: `
    <div class="auth-container">
      <mat-card class="auth-card">
        <mat-card-header>
          <mat-card-title class="auth-title">Recuperar senha</mat-card-title>
          <mat-card-subtitle>Informe seu e-mail para receber as instruções</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <form (ngSubmit)="onSubmit()" #forgotForm="ngForm">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>E-mail cadastrado</mat-label>
              <input matInput type="email" [(ngModel)]="email" name="email" required email #emailInput="ngModel">
              <mat-error *ngIf="emailInput.invalid && emailInput.touched">E-mail inválido</mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" class="full-width" [disabled]="forgotForm.invalid">
              Enviar instruções
            </button>
          </form>
        </mat-card-content>

        <mat-card-actions>
          <button mat-button (click)="goToLogin()">
            <mat-icon>arrow_back</mat-icon>
            Voltar para login
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 16px;
    }
    .auth-card {
      max-width: 400px;
      width: 100%;
    }
    .auth-title {
      font-size: 24px;
      font-weight: 500;
    }
    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }
    mat-card-actions {
      border-top: 1px solid #e0e0e0;
      padding: 16px;
      display: flex;
      justify-content: center;
    }
  `]
})
export class ForgotPasswordComponent {
  email = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    const result = this.authService.recoverPassword(this.email);
    this.snackBar.open(result.message, 'Fechar', { duration: 3000 });
    this.router.navigate(['/login']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
