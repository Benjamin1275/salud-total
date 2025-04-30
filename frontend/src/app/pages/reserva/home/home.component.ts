import { Component } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-home',
  imports: [
    CardComponent, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule, 
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // Esto es una propiedad del componente, que se puede usar en el template
  prevision: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  medicos: Food[] = [
    { value: 'steak-0', viewValue: 'Benjamín' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
}
