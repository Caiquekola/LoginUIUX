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
  selector: 'app-login',
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
          <mat-card-title class="auth-title">Entrar</mat-card-title>
          <mat-card-subtitle>Use sua conta para continuar</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
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

            <button mat-raised-button color="primary" type="submit" class="full-width" [disabled]="loginForm.invalid">
              Entrar
            </button>
          </form>

          <div class="auth-links">
            <button mat-button (click)="goToForgot()">Esqueci minha senha</button>
          </div>
        </mat-card-content>

        <mat-card-actions align="end">
          <span>Não tem uma conta?</span>
          <button mat-button color="primary" (click)="goToRegister()">Criar conta</button>
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
    .auth-links {
      display: flex;
      justify-content: flex-end;
      margin-top: 8px;
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
export class LoginComponent {
  email = '';
  password = '';
  hidePassword = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    const result = this.authService.login(this.email, this.password);
    
    if (result.success) {
      this.snackBar.open(result.message, 'Fechar', { duration: 3000 });
      this.router.navigate(['/events']);
    } else {
      this.snackBar.open(result.message, 'Fechar', { duration: 3000, panelClass: ['error-snackbar'] });
    }
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  goToForgot(): void {
    this.router.navigate(['/forgot-password']);
  }
}
