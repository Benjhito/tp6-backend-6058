import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TransactionsService } from '../../services/transactions/transactions.service';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.css'
})
export class TransactionsListComponent {
  transactions: any[] = [];
  filterForm: FormGroup;
  error: string = '';

  constructor(
    private transactionsService: TransactionsService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      fromCurrency: ['', Validators.required],
      toCurrency: ['', Validators.required]
    });
  }

  getAllTransactions() {
    this.transactionsService.getAllTransactions().subscribe(
      data => {
        this.transactions = data;
        this.error = '';
      },
      err => {
        this.error = 'Error al recuperar las transacciones';
      }
    );
  }

  getTransactionsByCurrency() {
    if (this.filterForm.invalid) {
      this.error = 'Debe completar ambos campos de moneda';
      return;
    }

    const { fromCurrency, toCurrency } = this.filterForm.value;
    this.transactionsService.getTransactionsByCurrency(fromCurrency, toCurrency).subscribe(
      data => {
        this.transactions = data;
        this.error = '';
      },
      err => {
        this.error = 'Error al recuperar las transacciones';
      }
    );
  }
}
