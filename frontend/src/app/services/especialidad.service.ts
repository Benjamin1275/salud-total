import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  private especialidadSubject = new BehaviorSubject<number | null>(null);
  especialidad$ = this.especialidadSubject.asObservable();

  setEspecialidad(id: number): void {
    this.especialidadSubject.next(id);
  }

  getEspecialidad(): number | null {
    return this.especialidadSubject.getValue();
  }

  resetEspecialidad(): void {
    this.especialidadSubject.next(null);
  }
}
