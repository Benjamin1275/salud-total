import { Routes } from '@angular/router';
import { HorasAtencionComponent } from './pages/reserva/horas-atencion/horas-atencion.component';
import { HomeComponent } from './pages/reserva/home/home.component';
import { DatosPacienteComponent } from './pages/reserva/datos-paciente/datos-paciente.component';
import { ResumenCitaComponent } from './pages/reserva/resumen-cita/resumen-cita.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'horas-atencion', component: HorasAtencionComponent },
    { path: 'datos-paciente', component:  DatosPacienteComponent},
    { path: 'resumen', component:  ResumenCitaComponent},
];
