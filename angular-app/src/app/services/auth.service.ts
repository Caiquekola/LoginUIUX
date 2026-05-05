import { Injectable, signal, computed } from '@angular/core';
import { User, AuthState } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    { id: 1, name: 'Admin', email: 'admin@admin.com', password: 'admin123' }
  ];

  private authState = signal<AuthState>({
    isLoggedIn: false,
    user: null
  });

  readonly isLoggedIn = computed(() => this.authState().isLoggedIn);
  readonly currentUser = computed(() => this.authState().user);

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem('auth_state');
    console.log("stored:",stored);
    if (stored) {
      const state = JSON.parse(stored);
      if (state.isLoggedIn && state.user) {
        this.authState.set(state);
      }
    }
    
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    } else {
      this.saveUsers();
    }
  }

  private saveUsers(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  private saveAuthState(): void {
    localStorage.setItem('auth_state', JSON.stringify(this.authState()));
  }

  login(email: string, password: string): { success: boolean; message: string } {
    const user = this.users.find(u => u.email === email && u.password === password);
    console.log("user:",user);
    if (user) {
      this.authState.set({ isLoggedIn: true, user });
      this.saveAuthState();
      return { success: true, message: 'Login realizado com sucesso!' };
    }
    
    return { success: false, message: 'E-mail ou senha incorretos.' };
  }

  register(name: string, email: string, password: string): { success: boolean; message: string } {
    if (this.users.find(u => u.email === email)) {
      return { success: false, message: 'Este e-mail já está cadastrado.' };
    }

    const newUser: User = {
      id: this.users.length + 1,
      name,
      email,
      password
    };

    this.users.push(newUser);
    this.saveUsers();
    
    return { success: true, message: 'Conta criada com sucesso! Faça login para continuar.' };
  }

  logout(): void {
    this.authState.set({ isLoggedIn: false, user: null });
    localStorage.removeItem('auth_state');
  }

  recoverPassword(email: string): { success: boolean; message: string } {
    const user = this.users.find(u => u.email === email);
    
    if (user) {
      // Simulação de envio de e-mail
      return { success: true, message: 'Instruções enviadas para seu e-mail.' };
    }
    
    return { success: true, message: 'Se o e-mail estiver cadastrado, você receberá as instruções.' };
  }
}
