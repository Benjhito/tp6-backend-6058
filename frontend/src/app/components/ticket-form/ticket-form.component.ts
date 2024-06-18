import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TicketsService } from '../../services/tickets/tickets.service';
import { EspectadoresService } from '../../services/espectadores/espectadores.service';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './ticket-form.component.html',
  styleUrl: './ticket-form.component.css'
})
export class TicketFormComponent implements OnInit {
  ticketForm: FormGroup;
  error: string = '';
  success: string = '';
  isEditing: boolean = false;
  ticketIdToEdit: number | null = null;
  espectadores: any[] = [];

  constructor(
    private fb: FormBuilder,
    private ticketsService: TicketsService,
    private espectadoresService: EspectadoresService
  ) {
    this.ticketForm = this.fb.group({
      espectador: ['', Validators.required],
      precioTicket: ['', Validators.required],
      categoriaEspectador: ['', Validators.required],
      fechaCompra: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.espectadoresService.getEspectadores().subscribe(
      (data) => {
        this.espectadores = data;
      },
      (error) => {
        console.error('Error al obtener los espectadores', error);
      }
    );
  }

  submitForm() {

    if (this.ticketForm.invalid) {
      this.error = 'Todos los campos son obligatorios';
      return;
    }

    const ticketData = this.ticketForm.value;

    if (this.isEditing && this.ticketIdToEdit !== null) {
      this.ticketsService.updateTicket(this.ticketIdToEdit, ticketData).subscribe(
        () => {
          this.success = 'Ticket actualizado exitosamente';
          this.error = '';
          this.resetForm();
        },
        err => {
          this.error = 'Error al actualizar el ticket';
          this.success = '';
        }
      );
    } else {
      this.ticketsService.addTicket(ticketData).subscribe(
        () => {
          this.success = 'Ticket agregado exitosamente';
          this.error = '';
          this.resetForm();
        },
        err => {
          this.error = 'Error al agregar el ticket';
          this.success = '';
        }
      );
    }
  }

  resetForm() {
    this.ticketForm.reset();
    this.isEditing = false;
    this.ticketIdToEdit = null;
  }

  editTicket(ticket: any) {
    this.ticketForm.patchValue(ticket);
    this.isEditing = true;
    this.ticketIdToEdit = ticket.id;
  }
}
