import { Component } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { DatosService } from '../../../services/datos.service';
import { EspecialidadService } from '../../../services/especialidad.service';
type Especialidad = {
  id: number;
  nombre: string;
}

type Prevision = {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-home',
  imports: [
    CardComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  especialidades: Especialidad[] = [];
  previsiones: Prevision[] = [];
  previsionSeleccionada: number | null = null;
  especialidadSeleccionada: number | null = null;

  // Inyectar el servicio de datos en el constructor
  constructor(private datosService: DatosService, private especialidadService: EspecialidadService) {
    console.log("Servicio de datos inicializado en HomeComponent");
  }

  ngOnInit() {
    this.especialidades = this.datosService.getEspecialidades();
    this.previsiones = this.datosService.getPrevisiones();
  }
}
