import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketsService } from '../../services/tickets/tickets.service';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css'
})
export class TicketListComponent implements OnInit {
  tickets: any[] = [];
  error: string = '';
  filterCategory: string = '';

  constructor(private ticketsService: TicketsService) {}

  ngOnInit() {
    //this.getAllTickets();
  }

  getAllTickets() {
    this.ticketsService.getAllTickets().subscribe(
      data => {
        this.tickets = data;
        this.error = '';
      },
      err => {
        this.error = 'Error al recuperar los tickets';
      }
    );
  }

  getTicketsByCategory() {
    if (!this.filterCategory) {
      this.error = 'Seleccione una categoría';
      return;
    }

    this.ticketsService.getTicketsByCategory(this.filterCategory).subscribe(
      data => {
        this.tickets = data;
        this.error = '';
      },
      err => {
        this.error = 'Error al recuperar los tickets por categoría';
      }
    );
  }

  deleteTicket(ticketId: number) {
    this.ticketsService.deleteTicket(ticketId).subscribe(
      () => {
        this.tickets = this.tickets.filter(ticket => ticket.id !== ticketId);
        this.error = '';
      },
      err => {
        this.error = 'Error al eliminar el ticket';
      }
    );
  }
}
