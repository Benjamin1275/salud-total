import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/reserva/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'horas-atencion',
        loadComponent: () => import('./pages/reserva/horas-atencion/horas-atencion.component').then(m => m.HorasAtencionComponent)
    }
];
