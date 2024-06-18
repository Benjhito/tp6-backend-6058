import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private apiUrl = 'http://localhost:5000/api/tickets';

  constructor(private http: HttpClient) {}

  getAllTickets(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTicketsByCategory(category: string): Observable<any[]> {
    const url = `${this.apiUrl}/categoria/${category}`;
    return this.http.get<any[]>(url);
  }

  addTicket(ticket: any): Observable<any> {
    console.log(ticket.precioTicket);
    return this.http.post(this.apiUrl, ticket);
  }

  updateTicket(ticketId: number, ticket: any): Observable<any> {
    const url = `${this.apiUrl}/${ticketId}`;
    return this.http.put(url, ticket);
  }

  deleteTicket(ticketId: number): Observable<any> {
    const url = `${this.apiUrl}/${ticketId}`;
    return this.http.delete(url);
  }
}
