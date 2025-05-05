import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CardComponent } from '../../../components/card/card.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { DatosService } from '../../../services/datos.service';
interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-horas-atencion',
  imports: [MatCardModule, MatDatepickerModule, CardComponent, MatListModule, MatButtonModule, MatFormFieldModule, MatSelectModule, MatInputModule ],
  templateUrl: './horas-atencion.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './horas-atencion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorasAtencionComponent {
  constructor(private datosService: DatosService) {
    console.log("Servicio de datos inicializado en HorasAtencionComponent");
  }
  selected = model<Date | null>(null);


  ngOnInit() {
    //Llamar a las horas disponibles del médico (Falta implementar)
    // this.datosService.getHorasDisponibles().subscribe((horas) => {
    //   this.horas = horas;
    // });
    console.log("Especialidad seleccionada:", this.datosService.especialidad$);
    console.log("Previsión seleccionada:", this.datosService.prevision$);
    console.log("Medico seleccionado:", this.datosService.medico$);
  }
  //ejemplo de un array de horas
  horas = [
    { id: 1, hora: '08:00', disponible: true },
    { id: 2, hora: '09:00', disponible: true },
    { id: 3, hora: '10:00', disponible: false },
    { id: 4, hora: '11:00', disponible: true },
    { id: 5, hora: '12:00', disponible: false },
    { id: 6, hora: '13:00', disponible: true },
    { id: 7, hora: '14:00', disponible: true },
    { id: 8, hora: '15:00', disponible: false },
    { id: 9, hora: '16:00', disponible: true },
    { id: 10, hora: '17:00', disponible: true },
  ];
  medicos: Food[] = [
    { value: 'steak-0', viewValue: 'Benjamín' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
}
