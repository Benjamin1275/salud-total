import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';

@Component({
  selector: 'app-appointment-history',
  imports: [SidebarComponent, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule,
    MatTableModule, MatSelectModule, MatOptionModule, FormsModule, CommonModule],
  templateUrl: './appointment-history.component.html',
  styleUrl: './appointment-history.component.css'
})
export class AppointmentHistoryComponent {
  searchTerm: string = '';
  reportType: string = 'all'; // Tipo de reporte seleccionado

  appointments = [
    { rut: '12345678-9', name: 'Juan Pérez', date: new Date(), status: 'Pendiente' },
    { rut: '98765432-1', name: 'María López', date: new Date(), status: 'Completado' },
    { rut: '18365454-2', name: 'Marío López', date: new Date(), status: 'Pendiente' },
    { rut: '28465465-3', name: 'Lépez Marie', date: new Date(), status: 'Pendiente' },
    { rut: '48265489-4', name: 'Marieo Lupus', date: new Date(), status: 'Completado' },
  ];

  // Método para descargar el reporte
  downloadReport() {
    Swal.fire({
      title: 'Seleccionar tipo de reporte',
      html: `
        <div style="display: flex; flex-direction: column; gap: 1rem; text-align: left; max-width: 350px; margin: 0 auto;">
          <div>
            <label for="reportType" style="font-weight: bold; display: block; margin-bottom: 0.5rem;">Tipo de reporte:</label>
            <select id="reportType" class="swal2-select" style="width: 100%; padding: 0.6rem; border-radius: 5px; border: 1px solid #ccc; font-size: 14px;">
              <option value="all">Todas</option>
              <option value="completed">Completadas</option>
              <option value="cancelled">Inasistencias</option>
              <option value="pending">Pendientes</option>
            </select>
          </div>
          <div>
            <label for="fileFormat" style="font-weight: bold; display: block; margin-bottom: 0.5rem;">Formato de archivo:</label>
            <select id="fileFormat" class="swal2-select" style="width: 100%; padding: 0.6rem; border-radius: 5px; border: 1px solid #ccc; font-size: 14px;">
              <option value="pdf">PDF</option>
              <option value="word">Word</option>
            </select>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Generar Reporte',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const reportType = (document.getElementById('reportType') as HTMLSelectElement).value;
        const fileFormat = (document.getElementById('fileFormat') as HTMLSelectElement).value;

        if (!reportType || !fileFormat) {
          Swal.showValidationMessage('Debes seleccionar un tipo de reporte y un formato de archivo.');
        }

        return { reportType, fileFormat };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { reportType, fileFormat } = result.value;

        let filteredAppointments = this.appointments;
        let fileName = 'Todas';
        if (reportType === 'completed') {
          filteredAppointments = this.appointments.filter(app => app.status === 'Completado');
          fileName = 'Completadas';
        } else if (reportType === 'cancelled') {
          filteredAppointments = this.appointments.filter(app => app.status === 'No asistió');
          fileName = 'Inasistencias';
        } else if (reportType === 'pending') {
          filteredAppointments = this.appointments.filter(app => app.status === 'Pendiente');
          fileName = 'Pendientes';
        }

        if (fileFormat === 'pdf') {
          this.generatePDF(filteredAppointments, fileName);
        } else if (fileFormat === 'word') {
          this.generateWord(filteredAppointments, fileName);
        }
      }
    });
  }

  generatePDF(appointments: any[], fileName: string) {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`Reporte de citas: ${fileName}`, 10, 10);

    let y = 20;
    appointments.forEach((app, index) => {
      doc.text(
        `${index + 1}. RUT: ${app.rut}, Nombre: ${app.name}, Fecha: ${app.date.toLocaleDateString()}, Estado: ${app.status}`,
        10,
        y
      );
      y += 10;
    });

    doc.save(`reporte_citas_${fileName}.pdf`);
  }

  generateWord(appointments: any[], fileName: string) {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `Reporte de citas: ${fileName}`,
                  bold: true,
                  size: 24
                })
              ]
            }),
            ...appointments.map((app, index) =>
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${index + 1}. RUT: ${app.rut}, Nombre: ${app.name}, Fecha: ${app.date.toLocaleDateString()}, Estado: ${app.status}`,
                    size: 20
                  })
                ]
              })
            )
          ]
        }
      ]
    });

    Packer.toBlob(doc).then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reporte_citas_${fileName}.docx`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  // Define las columnas que se mostrarán en la tabla
  displayedColumns: string[] = ['rut', 'name', 'date', 'attendance', 'status', 'delete'];

  get filteredAppointments() {
    return this.appointments.filter(appointment =>
      appointment.rut.includes(this.searchTerm) || appointment.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  clearSearch() {
    this.searchTerm = '';
  }


  deleteAppointment(appointment: any) {
    Swal.fire({
      title: '¿Estás seguro de eliminar esta cita?',
      text: 'Por favor, ingresa un motivo para la cancelación:',
      input: 'text',
      inputPlaceholder: 'Motivo de cancelación',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'Debes ingresar un motivo para continuar.';
        }
        return null;
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        // Eliminar la cita si se confirma
        this.appointments = this.appointments.filter(a => a !== appointment);
        Swal.fire({
          icon: 'success',
          title: 'Cita eliminada',
          text: `Motivo: ${result.value}`,
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  editAttendance(appointment: any) {
    Swal.fire({
      title: 'Editar asistencia',
      html: `
        <p><strong>RUT:</strong> ${appointment.rut}</p>
        <p><strong>Nombre:</strong> ${appointment.name}</p>
        <p><strong>Estado actual:</strong> ${appointment.status}</p>
        <div style="margin-top: 1rem; text-align: center;">
          <button id="asistio" class="attendance-btn" style="background-color: #4caf50; color: white; padding: 0.5rem 1rem; border-radius: 5px; margin: 0.5rem; font-size: 1rem; border: 2px solid transparent; cursor: pointer;">Asistió</button>
          <button id="no-asistio" class="attendance-btn" style="background-color: #f44336; color: white; padding: 0.5rem 1rem; border-radius: 5px; margin: 0.5rem; font-size: 1rem; border: 2px solid transparent; cursor: pointer;">No asistió</button>
          <button id="completado" class="attendance-btn" style="background-color: #2196f3; color: white; padding: 0.5rem 1rem; border-radius: 5px; margin: 0.5rem; font-size: 1rem; border: 2px solid transparent; cursor: pointer;">Completado</button>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: '<span style="font-size: 1rem; font-weight: bold;">Confirmar</span>',
      cancelButtonText: '<span style="font-size: 1rem; font-weight: bold;">Cancelar</span>',
      preConfirm: () => {
        const selectedOption = document.querySelector('.attendance-btn.selected')?.id;
        if (!selectedOption) {
          Swal.showValidationMessage('Debes seleccionar una opción de asistencia.');
        }
        return selectedOption;
      },
      didOpen: () => {
        const buttons = document.querySelectorAll('.attendance-btn');
        buttons.forEach(button => {
          button.addEventListener('click', () => {
            buttons.forEach(btn => {
              btn.classList.remove('selected');
              (btn as HTMLElement).style.border = '2px solid transparent'; // Limpia el borde de los demás botones
            });
            button.classList.add('selected');
            (button as HTMLElement).style.border = '2px solid #cddc39'; // Agrega un borde para el botonss
          });
        });
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Actualizar el estado de la cita
        const newStatus = result.value === 'asistio' ? 'Asistió' : result.value === 'no-asistio' ? 'No asistió' : 'Completado';
        appointment.status = newStatus;
        Swal.fire({
          icon: 'success',
          title: 'Asistencia actualizada',
          text: `El estado de la cita ha sido cambiado a: ${newStatus}`,
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
}
