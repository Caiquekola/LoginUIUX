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
  selector: 'app-register',
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
          <mat-card-title class="auth-title">Criar conta</mat-card-title>
          <mat-card-subtitle>Preencha os dados para se registrar</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Nome completo</mat-label>
              <input matInput type="text" [(ngModel)]="name" name="name" required>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>E-mail</mat-label>
              <input matInput type="email" [(ngModel)]="email" name="email" required email #emailInput="ngModel">
              <mat-error *ngIf="emailInput.invalid && emailInput.touched">E-mail inválido</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Senha</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" [(ngModel)]="password" name="password" required minlength="6">
              <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-hint>Mínimo de 6 caracteres</mat-hint>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Confirmar senha</mat-label>
              <input matInput [type]="hideConfirm ? 'password' : 'text'" [(ngModel)]="confirmPassword" name="confirmPassword" required>
              <button mat-icon-button matSuffix (click)="hideConfirm = !hideConfirm" type="button">
                <mat-icon>{{hideConfirm ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="password !== confirmPassword && confirmPassword">As senhas não coincidem</mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" class="full-width" [disabled]="registerForm.invalid || password !== confirmPassword">
              Criar conta
            </button>
          </form>
        </mat-card-content>

        <mat-card-actions align="end">
          <span>Já tem uma conta?</span>
          <button mat-button color="primary" (click)="goToLogin()">Entrar</button>
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
      align-items: center;
      gap: 8px;
    }
  `]
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  hidePassword = true;
  hideConfirm = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      this.snackBar.open('As senhas não coincidem', 'Fechar', { duration: 3000 });
      return;
    }

    const result = this.authService.register(this.name, this.email, this.password);
    
    if (result.success) {
      this.snackBar.open(result.message, 'Fechar', { duration: 3000 });
      this.router.navigate(['/login']);
    } else {
      this.snackBar.open(result.message, 'Fechar', { duration: 3000 });
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
