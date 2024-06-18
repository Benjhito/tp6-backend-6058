import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private apiUrl = 'http://localhost:5000/api/transactions';

  constructor(private http: HttpClient) {}

  addTransaction(transaction: any): Observable<any> {
    return this.http.post(this.apiUrl, transaction);
  }

  getAllTransactions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTransactionsByCurrency(fromCurrency: string, toCurrency: string): Observable<any[]> {
    const url = `${this.apiUrl}/${fromCurrency}/${toCurrency}`;
    return this.http.get<any[]>(url);
  }
}
