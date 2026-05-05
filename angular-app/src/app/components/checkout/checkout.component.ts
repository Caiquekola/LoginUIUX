import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { CartItem } from '../../models/ticket.model';

type PaymentField = 'cardNumber' | 'cardExpiry' | 'cardCvv' | 'cardName';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <mat-toolbar color="primary" class="toolbar">
      <button mat-icon-button type="button" aria-label="Voltar para eventos" (click)="goBack()">
        <mat-icon>arrow_back</mat-icon>
      </button>
      <span>Finalizar Compra</span>
      <span class="spacer"></span>
      <span class="toolbar-safe">
        <mat-icon>lock</mat-icon>
        Simulado
      </span>
    </mat-toolbar>

    <main class="page-shell">
      <section class="checkout-hero" aria-label="Resumo da finalização de compra">
        <div>
          <p class="eyebrow">Checkout</p>
          <h1>Revise seus ingressos e conclua o pagamento</h1>
          <p class="hero-description">
            Confira os dados do carrinho antes de confirmar. O pagamento abaixo é apenas uma simulação.
          </p>
        </div>
      </section>

      <section class="checkout-container" [class.single-column]="cartItems.length === 0">
        <mat-card class="surface-card cart-card">
          <mat-card-header>
            <div mat-card-avatar class="card-avatar">
              <mat-icon>shopping_cart</mat-icon>
            </div>
            <mat-card-title>Seu carrinho</mat-card-title>
            <mat-card-subtitle>{{ cartItems.length }} item(ns) selecionado(s)</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <div *ngIf="cartItems.length === 0" class="empty-cart">
              <div class="empty-icon">
                <mat-icon>confirmation_number</mat-icon>
              </div>
              <h2>Seu carrinho está vazio</h2>
              <p>Escolha um evento para continuar a compra.</p>
              <button mat-raised-button color="primary" type="button" (click)="goToEvents()">
                Ver eventos
              </button>
            </div>

            <div *ngIf="cartItems.length > 0" class="cart-items">
              <article class="cart-item" *ngFor="let item of cartItems; let i = index; trackBy: trackByIndex">
                <div class="ticket-icon" aria-hidden="true">
                  <mat-icon>local_activity</mat-icon>
                </div>

                <div class="item-info">
                  <h3>{{ item.eventoTitulo }}</h3>
                  <p>{{ item.categoria.nome }} • Assento {{ item.assento }}</p>
                </div>

                <div class="item-price">
                  {{ item.preco | currency:'BRL':'symbol':'1.2-2' }}
                </div>

                <button mat-icon-button color="warn" type="button" aria-label="Remover ingresso" (click)="removeItem(i)">
                  <mat-icon>delete_outline</mat-icon>
                </button>
              </article>
            </div>
          </mat-card-content>
        </mat-card>

        <form
          *ngIf="cartItems.length > 0"
          #paymentForm="ngForm"
          class="payment-section"
          novalidate
          autocomplete="on"
          (ngSubmit)="processPayment()"
        >
          <mat-card class="surface-card payment-card">
            <mat-card-header>
              <div mat-card-avatar class="card-avatar">
                <mat-icon>credit_card</mat-icon>
              </div>
              <mat-card-title>Dados do pagamento</mat-card-title>
              <mat-card-subtitle>Campos formatados automaticamente</mat-card-subtitle>
            </mat-card-header>

            <mat-card-content>
              <div class="payment-preview" aria-label="Prévia visual do cartão">
                <div>
                  <span class="preview-label">Cartão</span>
                  <strong>{{ getCardBrandLabel() }}</strong>
                </div>
                <div class="preview-number">{{ getCardNumberPreview() }}</div>
                <div class="preview-footer">
                  <span>{{ cardName || 'NOME NO CARTÃO' }}</span>
                  <span>{{ cardExpiry || 'MM/AA' }}</span>
                </div>
              </div>

              <div class="security-note">
                <mat-icon>info</mat-icon>
                <span>Ambiente simulado: não use dados reais de cartão.</span>
              </div>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Número do cartão</mat-label>
                <input
                  matInput
                  required
                  inputmode="numeric"
                  autocomplete="cc-number"
                  name="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  maxlength="23"
                  #cardNumberModel="ngModel"
                  [ngModel]="cardNumber"
                  (ngModelChange)="onCardNumberChange($event)"
                  (blur)="touchField('cardNumber')"
                >
                <mat-icon matSuffix>credit_card</mat-icon>
                <mat-hint>Use apenas números. A máscara é aplicada automaticamente.</mat-hint>
                <mat-error *ngIf="shouldShowError('cardNumber', cardNumberModel)">
                  {{ cardNumberError }}
                </mat-error>
              </mat-form-field>

              <div class="form-row">
                <mat-form-field appearance="outline" class="half-width">
                  <mat-label>Validade</mat-label>
                  <input
                    matInput
                    required
                    inputmode="numeric"
                    autocomplete="cc-exp"
                    name="cardExpiry"
                    placeholder="MM/AA"
                    maxlength="5"
                    #cardExpiryModel="ngModel"
                    [ngModel]="cardExpiry"
                    (ngModelChange)="onCardExpiryChange($event)"
                    (blur)="touchField('cardExpiry')"
                  >
                  <mat-icon matSuffix>event</mat-icon>
                  <mat-error *ngIf="shouldShowError('cardExpiry', cardExpiryModel)">
                    {{ cardExpiryError }}
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="half-width">
                  <mat-label>CVV</mat-label>
                  <input
                    matInput
                    required
                    type="password"
                    inputmode="numeric"
                    autocomplete="cc-csc"
                    name="cardCvv"
                    placeholder="000"
                    maxlength="4"
                    #cardCvvModel="ngModel"
                    [ngModel]="cardCvv"
                    (ngModelChange)="onCardCvvChange($event)"
                    (blur)="touchField('cardCvv')"
                  >
                  <mat-icon matSuffix>password</mat-icon>
                  <mat-error *ngIf="shouldShowError('cardCvv', cardCvvModel)">
                    {{ cardCvvError }}
                  </mat-error>
                </mat-form-field>
              </div>

              <mat-form-field appearance="outline" class="full-width last-field">
                <mat-label>Nome no cartão</mat-label>
                <input
                  matInput
                  required
                  autocomplete="cc-name"
                  name="cardName"
                  placeholder="Nome e sobrenome"
                  maxlength="80"
                  #cardNameModel="ngModel"
                  [ngModel]="cardName"
                  (ngModelChange)="onCardNameChange($event)"
                  (blur)="touchField('cardName')"
                >
                <mat-icon matSuffix>person</mat-icon>
                <mat-hint>Digite como aparece no cartão.</mat-hint>
                <mat-error *ngIf="shouldShowError('cardName', cardNameModel)">
                  {{ cardNameError }}
                </mat-error>
              </mat-form-field>
            </mat-card-content>
          </mat-card>

          <mat-card class="surface-card total-card">
            <mat-card-content>
              <h2>Resumo do pedido</h2>

              <div class="total-row">
                <span>Subtotal</span>
                <strong>{{ getSubtotal() | currency:'BRL':'symbol':'1.2-2' }}</strong>
              </div>

              <div class="total-row">
                <span>Taxa de serviço</span>
                <strong>{{ getServiceFee() | currency:'BRL':'symbol':'1.2-2' }}</strong>
              </div>

              <div class="total-row total">
                <span>Total</span>
                <strong>{{ getTotal() | currency:'BRL':'symbol':'1.2-2' }}</strong>
              </div>
            </mat-card-content>

            <mat-card-actions>
              <button
                mat-raised-button
                color="primary"
                class="confirm-button"
                type="submit"
                [disabled]="isProcessing || !isFormValid()"
              >
                <mat-spinner *ngIf="isProcessing" diameter="20" class="spinner"></mat-spinner>
                <span>{{ isProcessing ? 'Processando...' : 'Confirmar pagamento' }}</span>
              </button>
            </mat-card-actions>
          </mat-card>
        </form>
      </section>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background:
        radial-gradient(circle at top left, rgba(103, 80, 164, 0.16), transparent 32rem),
        linear-gradient(180deg, #fbf8ff 0%, #f7f7fb 48%, #ffffff 100%);
    }

    .toolbar {
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 8px 24px rgba(31, 31, 31, 0.12);
    }

    .spacer {
      flex: 1 1 auto;
    }

    .toolbar-safe {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      font-weight: 500;
      opacity: 0.92;
    }

    .toolbar-safe mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .page-shell {
      width: min(1120px, calc(100% - 32px));
      margin: 0 auto;
      padding: 32px 0 48px;
    }

    .checkout-hero {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 24px;
      margin-bottom: 24px;
    }

    .eyebrow {
      margin: 0 0 8px;
      color: #6750a4;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .checkout-hero h1 {
      max-width: 720px;
      margin: 0;
      color: #1d1b20;
      font-size: clamp(28px, 4vw, 42px);
      line-height: 1.08;
      letter-spacing: -0.04em;
    }

    .hero-description {
      max-width: 660px;
      margin: 12px 0 0;
      color: #5f5b66;
      font-size: 16px;
      line-height: 1.6;
    }

    .checkout-container {
      display: grid;
      grid-template-columns: minmax(0, 1.35fr) minmax(340px, 0.9fr);
      gap: 24px;
      align-items: start;
    }

    .checkout-container.single-column {
      grid-template-columns: minmax(0, 1fr);
    }

    .surface-card {
      border: 1px solid rgba(103, 80, 164, 0.1);
      border-radius: 24px;
      box-shadow: 0 18px 45px rgba(31, 31, 31, 0.08);
      overflow: hidden;
    }

    .surface-card mat-card-header {
      padding: 24px 24px 8px;
    }

    .surface-card mat-card-content {
      padding: 18px 24px 24px;
    }

    .card-avatar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: rgba(103, 80, 164, 0.12);
      color: #6750a4;
    }

    .empty-cart {
      display: grid;
      justify-items: center;
      gap: 12px;
      padding: 44px 20px 36px;
      text-align: center;
      color: #5f5b66;
    }

    .empty-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 88px;
      height: 88px;
      margin-bottom: 4px;
      border-radius: 28px;
      background: rgba(103, 80, 164, 0.1);
      color: #6750a4;
    }

    .empty-icon mat-icon {
      width: 46px;
      height: 46px;
      font-size: 46px;
    }

    .empty-cart h2 {
      margin: 0;
      color: #1d1b20;
      font-size: 22px;
    }

    .empty-cart p {
      margin: 0 0 12px;
    }

    .cart-items {
      display: grid;
      gap: 12px;
    }

    .cart-item {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr) auto auto;
      align-items: center;
      gap: 14px;
      padding: 16px;
      border: 1px solid #ece7f2;
      border-radius: 18px;
      background: #fffbff;
      transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
    }

    .cart-item:hover {
      transform: translateY(-1px);
      border-color: rgba(103, 80, 164, 0.32);
      box-shadow: 0 10px 28px rgba(31, 31, 31, 0.08);
    }

    .ticket-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 16px;
      background: rgba(103, 80, 164, 0.1);
      color: #6750a4;
    }

    .item-info {
      min-width: 0;
    }

    .item-info h3 {
      overflow: hidden;
      margin: 0 0 4px;
      color: #1d1b20;
      font-size: 16px;
      font-weight: 700;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .item-info p {
      margin: 0;
      color: #6f6a76;
      font-size: 14px;
    }

    .item-price {
      color: #4f378b;
      font-weight: 800;
      white-space: nowrap;
    }

    .payment-section {
      display: grid;
      gap: 16px;
    }

    .payment-preview {
      display: grid;
      gap: 18px;
      margin-bottom: 18px;
      padding: 22px;
      border-radius: 22px;
      color: #ffffff;
      background:
        linear-gradient(135deg, rgba(103, 80, 164, 0.98), rgba(79, 55, 139, 0.96)),
        radial-gradient(circle at top right, rgba(255, 255, 255, 0.28), transparent 16rem);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 16px 32px rgba(79, 55, 139, 0.24);
    }

    .payment-preview > div:first-child {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      font-size: 13px;
    }

    .preview-label {
      opacity: 0.76;
    }

    .preview-number {
      font-family: 'Roboto Mono', 'Courier New', monospace;
      font-size: clamp(19px, 3vw, 25px);
      letter-spacing: 0.08em;
      white-space: nowrap;
    }

    .preview-footer {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      opacity: 0.92;
    }

    .security-note {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 18px;
      padding: 12px 14px;
      border-radius: 14px;
      color: #4f378b;
      background: rgba(103, 80, 164, 0.09);
      font-size: 13px;
      font-weight: 500;
    }

    .security-note mat-icon {
      flex: 0 0 auto;
      font-size: 19px;
      width: 19px;
      height: 19px;
    }

    .full-width {
      width: 100%;
      margin-bottom: 14px;
    }

    .last-field {
      margin-bottom: 0;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }

    .half-width {
      width: 100%;
      margin-bottom: 14px;
    }

    .total-card {
      position: sticky;
      top: 92px;
    }

    .total-card h2 {
      margin: 0 0 14px;
      color: #1d1b20;
      font-size: 18px;
    }

    .total-row {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      padding: 10px 0;
      color: #5f5b66;
      border-bottom: 1px solid #f0ebf5;
    }

    .total-row strong {
      color: #1d1b20;
    }

    .total-row.total {
      margin-top: 6px;
      padding-top: 16px;
      color: #1d1b20;
      border-bottom: 0;
      font-size: 20px;
    }

    .total-row.total strong {
      color: #4f378b;
      font-size: 24px;
    }

    .total-card mat-card-actions {
      padding: 0 24px 24px;
    }

    .confirm-button {
      width: 100%;
      min-height: 48px;
      border-radius: 999px;
      font-weight: 800;
    }

    .spinner {
      display: inline-block;
      margin-right: 8px;
      vertical-align: middle;
    }

    @media (max-width: 900px) {
      .checkout-container {
        grid-template-columns: 1fr;
      }

      .total-card {
        position: static;
      }
    }

    @media (max-width: 600px) {
      .page-shell {
        width: min(100% - 20px, 1120px);
        padding: 20px 0 32px;
      }

      .toolbar-safe {
        display: none;
      }

      .surface-card mat-card-header {
        padding: 20px 18px 4px;
      }

      .surface-card mat-card-content {
        padding: 16px 18px 20px;
      }

      .cart-item {
        grid-template-columns: auto minmax(0, 1fr) auto;
      }

      .cart-item .item-price {
        grid-column: 2 / 3;
        justify-self: start;
      }

      .cart-item button {
        grid-column: 3 / 4;
        grid-row: 1 / 3;
      }

      .form-row {
        grid-template-columns: 1fr;
        gap: 0;
      }

      .preview-footer {
        align-items: flex-start;
        flex-direction: column;
        gap: 8px;
      }
    }
  `]
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];

  cardNumber = '';
  cardExpiry = '';
  cardCvv = '';
  cardName = '';

  isProcessing = false;
  formSubmitted = false;

  cardNumberError = '';
  cardExpiryError = '';
  cardCvvError = '';
  cardNameError = '';

  private readonly touchedFields: Record<PaymentField, boolean> = {
    cardNumber: false,
    cardExpiry: false,
    cardCvv: false,
    cardName: false
  };

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

    this.cartItems = this.dataService.getCart();
  }

  getSubtotal(): number {
    return this.dataService.getCartTotal();
  }

  getServiceFee(): number {
    return this.getSubtotal() * 0.1;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getServiceFee();
  }

  trackByIndex(index: number): number {
    return index;
  }

  removeItem(index: number): void {
    this.dataService.removeFromCart(index);
    this.cartItems = this.dataService.getCart();

    this.snackBar.open('Ingresso removido do carrinho.', 'OK', {
      duration: 2500
    });
  }

  onCardNumberChange(value: string): void {
    const digits = this.onlyDigits(value).slice(0, 19);
    this.cardNumber = this.formatCardNumber(digits);
    this.validateCardNumber();
    this.validateCvv();
  }

  onCardExpiryChange(value: string): void {
    let digits = this.onlyDigits(value).slice(0, 4);

    if (digits.length === 1 && Number(digits) > 1) {
      digits = `0${digits}`;
    }

    this.cardExpiry = digits.length > 2
      ? `${digits.slice(0, 2)}/${digits.slice(2)}`
      : digits;

    this.validateCardExpiry();
  }

  onCardCvvChange(value: string): void {
    this.cardCvv = this.onlyDigits(value).slice(0, 4);
    this.validateCvv();
  }

  onCardNameChange(value: string): void {
    this.cardName = value
      .replace(/[^A-Za-zÀ-ÖØ-öø-ÿ'.\-\s]/g, '')
      .replace(/\s{2,}/g, ' ')
      .toUpperCase();

    this.validateCardName();
  }

  touchField(field: PaymentField): void {
    this.touchedFields[field] = true;
  }

  shouldShowError(field: PaymentField, control?: { touched?: boolean | null; dirty?: boolean | null }): boolean {
    return this.getFieldError(field) !== '' &&
      (this.formSubmitted || this.touchedFields[field] || !!control?.touched || !!control?.dirty);
  }

  isFormValid(): boolean {
    return this.onlyDigits(this.cardNumber).length >= 13 &&
      this.cardExpiry.trim().length === 5 &&
      this.cardCvv.trim().length >= 3 &&
      this.cardName.trim().length > 0 &&
      !this.cardNumberError &&
      !this.cardExpiryError &&
      !this.cardCvvError &&
      !this.cardNameError;
  }

  processPayment(): void {
    if (this.cartItems.length === 0 || this.isProcessing) return;

    this.formSubmitted = true;
    this.touchAllFields();
    this.validateAllFields();

    if (!this.isFormValid()) {
      this.snackBar.open('Corrija os campos destacados para continuar.', 'OK', {
        duration: 3500
      });
      return;
    }

    this.isProcessing = true;

    // Simula processamento de pagamento.
    setTimeout(() => {
      this.dataService.purchaseTickets();
      this.isProcessing = false;

      this.snackBar.open('Pagamento confirmado! Seus ingressos estão disponíveis.', 'Ver ingressos', {
        duration: 5000
      }).onAction().subscribe(() => {
        this.router.navigate(['/profile']);
      });

      this.router.navigate(['/profile']);
    }, 2000);
  }

  goBack(): void {
    this.router.navigate(['/events']);
  }

  goToEvents(): void {
    this.router.navigate(['/events']);
  }

  getCardBrandLabel(): string {
    return this.detectCardBrand() || 'Cartão de crédito';
  }

  getCardNumberPreview(): string {
    const digits = this.onlyDigits(this.cardNumber);

    if (!digits) {
      return '•••• •••• •••• ••••';
    }

    const visibleDigits = digits.padEnd(16, '•').slice(0, 19);
    return this.formatCardNumber(visibleDigits);
  }

  private validateAllFields(): void {
    this.validateCardNumber();
    this.validateCardExpiry();
    this.validateCvv();
    this.validateCardName();
  }

  private touchAllFields(): void {
    (Object.keys(this.touchedFields) as PaymentField[]).forEach(field => {
      this.touchedFields[field] = true;
    });
  }

  private validateCardNumber(): void {
    const digits = this.onlyDigits(this.cardNumber);

    if (!digits) {
      this.cardNumberError = 'Informe o número do cartão.';
      return;
    }

    if (digits.length < 13 || digits.length > 19) {
      this.cardNumberError = 'O cartão deve ter entre 13 e 19 dígitos.';
      return;
    }

    if (!this.isValidLuhn(digits)) {
      this.cardNumberError = 'Número de cartão inválido.';
      return;
    }

    this.cardNumberError = '';
  }

  private validateCardExpiry(): void {
    if (!this.cardExpiry.trim()) {
      this.cardExpiryError = 'Informe a validade do cartão.';
      return;
    }

    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (!regex.test(this.cardExpiry)) {
      this.cardExpiryError = 'Use o formato MM/AA.';
      return;
    }

    const [monthValue, yearValue] = this.cardExpiry.split('/');
    const expirationMonth = Number(monthValue);
    const expirationYear = 2000 + Number(yearValue);
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    if (
      expirationYear < currentYear ||
      (expirationYear === currentYear && expirationMonth < currentMonth)
    ) {
      this.cardExpiryError = 'Cartão vencido.';
      return;
    }

    this.cardExpiryError = '';
  }

  private validateCvv(): void {
    const digits = this.onlyDigits(this.cardCvv);
    const brand = this.detectCardBrand();
    const expectedLength = brand === 'American Express' ? 4 : 3;

    if (!digits) {
      this.cardCvvError = 'Informe o CVV.';
      return;
    }

    if (digits.length !== expectedLength) {
      this.cardCvvError = brand === 'American Express'
        ? 'American Express usa CVV com 4 dígitos.'
        : 'CVV deve ter 3 dígitos.';
      return;
    }

    this.cardCvvError = '';
  }

  private validateCardName(): void {
    const normalizedName = this.cardName.trim().replace(/\s{2,}/g, ' ');
    const nameParts = normalizedName.split(' ').filter(Boolean);
    const validCharacters = /^[A-Za-zÀ-ÖØ-öø-ÿ'.\-]+(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ'.\-]+)+$/;

    if (!normalizedName) {
      this.cardNameError = 'Informe o nome impresso no cartão.';
      return;
    }

    if (nameParts.length < 2) {
      this.cardNameError = 'Informe nome e sobrenome.';
      return;
    }

    if (nameParts.some(part => part.length < 2)) {
      this.cardNameError = 'Cada parte do nome deve ter pelo menos 2 caracteres.';
      return;
    }

    if (!validCharacters.test(normalizedName)) {
      this.cardNameError = 'Use apenas letras, espaços, hífen ou apóstrofo.';
      return;
    }

    this.cardNameError = '';
  }

  private getFieldError(field: PaymentField): string {
    const errors: Record<PaymentField, string> = {
      cardNumber: this.cardNumberError,
      cardExpiry: this.cardExpiryError,
      cardCvv: this.cardCvvError,
      cardName: this.cardNameError
    };

    return errors[field];
  }

  private onlyDigits(value: string): string {
    return (value || '').replace(/\D/g, '');
  }

  private formatCardNumber(value: string): string {
    return value.replace(/(.{4})/g, '$1 ').trim();
  }

  private detectCardBrand(): string {
    const digits = this.onlyDigits(this.cardNumber);

    if (/^4/.test(digits)) return 'Visa';
    if (/^(5[1-5]|2[2-7])/.test(digits)) return 'Mastercard';
    if (/^3[47]/.test(digits)) return 'American Express';
    if (/^(4011|4312|4389|4514|4576|5041|5067|509|6277|6362|6363|650|6516|6550)/.test(digits)) return 'Elo';
    if (/^(606282|3841)/.test(digits)) return 'Hipercard';

    return '';
  }

  private isValidLuhn(value: string): boolean {
    let sum = 0;
    let shouldDouble = false;

    for (let i = value.length - 1; i >= 0; i--) {
      let digit = Number(value.charAt(i));

      if (shouldDouble) {
        digit *= 2;

        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  }
}
