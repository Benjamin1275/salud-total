import { Component } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';


type Cita ={
  id: number;
  fecha: string;
  hora: string;
  nombre: string;
}
@Component({
  selector: 'app-resumen-cita',
  imports: [CardComponent],
  templateUrl: './resumen-cita.component.html',
  styleUrl: './resumen-cita.component.css'
})

export class ResumenCitaComponent {

  cita: Cita = {
    id: 1,
    fecha: '2023-10-01',
    hora: '10:00 AM',
    nombre: 'Juan Pérez',
  }

  confirmarCita() {
    alert('Cita confirmada!');
  }
}
