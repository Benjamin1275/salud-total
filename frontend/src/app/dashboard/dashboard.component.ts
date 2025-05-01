import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ChartModule } from 'primeng/chart';
//import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  selectedChartType: 'bar' | 'line' | 'doughnut' = 'bar';

  chartData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril'], 
    datasets: [
      {
        label: 'Asistencias', 
        data: [50, 40, 70, 60],
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        borderWidth: 1
      },
      {
        label: 'Inasistencias', 
        data: [20, 15, 25, 30],
        backgroundColor: '#66BB6A',
        borderColor: '#43A047',
        borderWidth: 1
      },
      {
        label: 'Canceladas', 
        data: [10, 5, 15, 20],
        backgroundColor: '#FFA726',
        borderColor: '#FB8C00',
        borderWidth: 1
      },
      {
        label: 'Totales', 
        data: [80, 60, 110, 110],
        backgroundColor: '#FF6384',
        borderColor: '#D32F2F',
        borderWidth: 1
      }
    ]
  };

  chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', 
        labels: {
          font: {
            size: 14 
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value} pacientes`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true // Asegura que el eje Y comience en 0
      }
    }
  };

  today: string = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).replace(/^\w/, (c) => c.toUpperCase());
  doctorName: string = 'Dr. Raúl Pérez';

  // No funcione noseee ayuda mejor amigo ayudaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  changeChartType(type: 'bar' | 'line' | 'doughnut') {
    console.log(`AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`);
    this.selectedChartType = type;
  }
}