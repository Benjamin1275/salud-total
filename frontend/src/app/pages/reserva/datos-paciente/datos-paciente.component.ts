import { Component } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-datos-paciente',
  imports: [CardComponent],
  templateUrl: './datos-paciente.component.html',
  styleUrl: './datos-paciente.component.css'
})
export class DatosPacienteComponent {
  form: FormGroup = new FormGroup({});
  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({});
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
