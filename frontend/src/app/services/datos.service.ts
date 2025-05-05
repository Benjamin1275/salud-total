import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface datosCitas {
  fechaCita: string;
  rut: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  telefono: string;
  sexo: string;
  email: string;
  direccion: string;
  idMedico: string;
}

type Especialidad = {
  id: number;
  nombre: string;
}

type Prevision = {
  id: number;
  nombre: string;
}

type Medico = {
  id: number;
  nombres: string;
  apellidos: string;
  idEspecialidad: string;
}

@Injectable({ providedIn: 'root' })
export class DatosService {
  private citaSubject = new BehaviorSubject<Partial<datosCitas>>({});
  private especialidadSubject = new BehaviorSubject<number | null>(null);
  private previsionSubject = new BehaviorSubject<number | null>(null);
  private medicoSubject = new BehaviorSubject<number>(0);

  public readonly cita$ = this.citaSubject.asObservable();
  public readonly especialidad$ = this.especialidadSubject.asObservable();
  public readonly prevision$ = this.previsionSubject.asObservable();
  public readonly medico$ = this.medicoSubject.asObservable();


  // Citas
  getCita(): Partial<datosCitas> {
    return this.citaSubject.getValue();
  }

  setCita(cita: datosCitas): void {
    this.citaSubject.next(cita);
  }

  updateCita(partial: Partial<datosCitas>): void {
    const actual = this.getCita();
    this.citaSubject.next({
      ...actual,
      ...partial,
    });
  }

  resetCita(): void {
    this.citaSubject.next({});
  }

  // Especialidades
  getEspecialidades(): Especialidad[] {
    return [
      { id: 1, nombre: 'Cardiología' },
      { id: 2, nombre: 'Dermatología' },
      { id: 3, nombre: 'Ginecología' },
      { id: 4, nombre: 'Pediatría' },
      { id: 5, nombre: 'Traumatología' },
    ];
  }

  setEspecialidad(id: number){
    this.especialidadSubject.next(id);
  }

  // Previsiones
  getPrevisiones(): Prevision[] {
    return [
      { id: 1, nombre: 'FONASA' },
      { id: 2, nombre: 'ISAPRE' },
      { id: 3, nombre: 'Particular' },
    ];
  }

  setPrevision(id: number): void {
    this.previsionSubject.next(id);
  }


  // Medicos
  getMedicos(): Medico[] {
    return [
      { id: 1, nombres: 'Juan', apellidos: 'Pérez', idEspecialidad: '1' },
      { id: 2, nombres: 'María', apellidos: 'Gómez', idEspecialidad: '2' },
      { id: 3, nombres: 'Pedro', apellidos: 'López', idEspecialidad: '3' },
      { id: 4, nombres: 'Ana', apellidos: 'Martínez', idEspecialidad: '4' },
      { id: 5, nombres: 'Luis', apellidos: 'Fernández', idEspecialidad: '5' },
    ];
  }


}
