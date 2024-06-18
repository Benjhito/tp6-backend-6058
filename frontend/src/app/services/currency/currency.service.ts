import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'https://exchangerate-api.p.rapidapi.com/rapid/latest/';
  private apiKey = '104a341075msh0e9105b356ab694p1c285fjsna74fa434ea23';

  constructor(private http: HttpClient) {}

  getExchangeRates(baseCurrency: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': this.apiKey,
		  'X-RapidAPI-Host': 'exchangerate-api.p.rapidapi.com'
    });

    return this.http.get<any>(`${this.apiUrl}${baseCurrency}`, { headers });
  }

  convertCurrency(amount: number, from: string, to: string): Observable<number> {
    return new Observable<number>((observer) => {
      this.getExchangeRates(from).subscribe((data) => {
        const rate = data.rates[to];
        if (rate) {
          observer.next(amount * rate);
        } else {
          observer.error('Moneda no encontrada');
        }
        observer.complete();
      }, (error) => {
        observer.error(error);
      });
    });
  }
}
