import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CurrencyService } from '../../services/currency/currency.service';
import { TransactionsService } from '../../services/transactions/transactions.service';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.css'
})
export class CurrencyConverterComponent {
  converterForm: FormGroup;
  amount: number = 1;
  fromCurrency: string = 'USD';
  toCurrency: string = 'ARS';
  result: number | null = null;
  error: string = '';
  baseCurrency = 'USD';

  currencies = [
    { id: 1, code: 'USD', name: 'USD Dólares EEUU', rate: 1, image: 'eeuu.png' },
    { id: 2, code: 'EUR', name: 'EUR Euros', rate: 1, image: 'euro.png' },
    { id: 3, code: 'GPB', name: 'GPB Libra Esterlina', rate: 1, image: 'libras.png' },
    { id: 4, code: 'JPY', name: 'JPY Yen Japonés', rate: 1, image: 'yenes.png' },
    { id: 5, code: 'CNY', name: 'CNY Yuan Renminbi Chino', rate: 1, image: 'yuanes.png' },
    { id: 6, code: 'AUD', name: 'AUD Dólares Australianos', rate: 1, image: 'australia.png' },
    { id: 7, code: 'BTC', name: 'BTC Bitcoin', rate: 1, image: 'bitcoin.png' },
    { id: 8, code: 'ARS', name: 'ARS Pesos Argentinos', rate: 1, image: 'argentina.png' }
  ];

  constructor(
    private fb: FormBuilder,
    private currencyService: CurrencyService,
    private transactionsService: TransactionsService
  ) {
    this.converterForm = this.fb.group({
      fromCurrency: ['', Validators.required],
      toCurrency: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.loadExchangeRates();
  }

  loadExchangeRates() {
    this.currencyService.getExchangeRates(this.baseCurrency).subscribe(
      (data) => {
        this.currencies.forEach(currency => {
          if (data.rates[currency.code]) {
            currency.rate = data.rates[currency.code];
          }
        });
      },
      (error) => {
        this.error = 'Error al cargar las tasas de cambio';
        console.error(error);
      }
    );
  }

  onSubmit() {
    if (this.converterForm.invalid) {
      this.error = 'Todos los campos son obligatorios y la cantidad debe ser mayor que cero.';
      return;
    }

    const { fromCurrency, toCurrency, amount } = this.converterForm.value;
    this.currencyService.convertCurrency(amount, fromCurrency, toCurrency).subscribe(
      (result: number) => {
        this.result = result;
        this.error = '';
        this.saveTransaction(fromCurrency, toCurrency, amount, this.result);
      },
      (error) => {
        this.result = null;
        this.error = 'Error en la conversión de divisas';
      }
/*
      response => {
        this.result = response.result;
        this.error = '';
        //this.saveTransaction(fromCurrency, toCurrency, amount, this.result);
      },
      err => {
        this.error = 'Error al convertir la moneda';
      }
*/
    );
  }

  saveTransaction(from: string, to: string, amount: number, result: number) {
    const transaction = {
      fromCurrency: from,
      toCurrency: to,
      amount: amount,
      result: result,
      date: new Date()
    };

    this.transactionsService.addTransaction(transaction).subscribe(
      response => {
        console.log('Transacción guardada exitosamente', response);
      },
      err => {
        console.error('Error al guardar la transacción', err);
      }
    );
  }
}

