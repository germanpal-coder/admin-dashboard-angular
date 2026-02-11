import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgFor, NgClass } from '@angular/common';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

interface DashboardCard {
  title: string;
  value: string;
  icon: string;
  color: string;
}

interface Appointment {
  time: string;
  patient: string;
  doctor: string;
  specialty: string;
  status: 'Confirmado' | 'Pendiente' | 'Cancelado';
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatTableModule,
    NgFor,
    NgClass,
    MatProgressBarModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements AfterViewInit {

  cards: DashboardCard[] = [
    { title: 'Pacientes activos', value: '128', icon: 'people', color: 'primary' },
    { title: 'Turnos hoy', value: '24', icon: 'event', color: 'accent' },
    { title: 'Profesionales', value: '12', icon: 'medical_services', color: 'primary' },
    { title: 'Estudios pendientes', value: '7', icon: 'biotech', color: 'warn' }
  ];

  statistics = [
    { title: 'Pacientes Today', value: '45', trend: '+12%', isUp: true, progress: 70, icon: 'person', color: '#4285F4' },
    { title: 'Pacientes Semanales', value: '61', trend: '+5%', isUp: true, progress: 45, icon: 'group', color: '#00BFA5' },
    { title: 'Citas', value: '8', trend: '-2%', isUp: false, progress: 30, icon: 'calendar_month', color: 'rgb(232, 173, 0)' },
    { title: 'Turnos Libres', value: '12', trend: 'Estable', isUp: true, progress: 85, icon: 'event_available', color: '#5D7A91' }
  ];

  displayedColumns = ['time', 'patient', 'doctor', 'specialty', 'status'];

  appointments: Appointment[] = [
    {
      time: '08:30',
      patient: 'Juan Pérez',
      doctor: 'Dr. Gómez',
      specialty: 'Clínica',
      status: 'Confirmado'
    },
    {
      time: '09:00',
      patient: 'María López',
      doctor: 'Dra. Fernández',
      specialty: 'Pediatría',
      status: 'Pendiente'
    },
    {
      time: '10:15',
      patient: 'Carlos Ruiz',
      doctor: 'Dr. Sosa',
      specialty: 'Cardiología',
      status: 'Confirmado'
    },
    {
      time: '11:00',
      patient: 'Ana Martínez',
      doctor: 'Dra. Torres',
      specialty: 'Dermatología',
      status: 'Cancelado'
    }
  ];

  @ViewChild('patientChart') patientChart!: ElementRef;
  @ViewChild('donutChart') donutChart!: ElementRef;

  ngAfterViewInit() {
    const ctx = this.patientChart.nativeElement.getContext('2d');
    
    // Creamos un gradiente para el área bajo la línea
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(0, 191, 165, 0.3)'); // Tu turquesa #00BFA5 con transparencia
    gradient.addColorStop(1, 'rgba(0, 191, 165, 0)');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
        datasets: [{
          label: 'Pacientes Atendidos',
          data: [12, 19, 15, 25, 22, 30, 28],
          borderColor: '#00BFA5',
          backgroundColor: gradient,
          fill: true,
          //tension: 0.4, // Esto hace que la línea sea curva y suave
          pointRadius: 4,
          pointBackgroundColor: '#00BFA5'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false } // Quitamos la leyenda para que sea más limpio
        },
        scales: {
          y: { beginAtZero: true, grid: { display: false } },
          x: { grid: { display: false } }
        }
      }
    });


    // --- Gráfico Donut (Nuevo) ---
    const ctxDonut = this.donutChart.nativeElement.getContext('2d');
    new Chart(ctxDonut, {
      type: 'doughnut',
      data: {
        labels: ['Clínica', 'Pediatría', 'Otros'],
        datasets: [{
          data: [55, 30, 15],
          backgroundColor: [
            '#00BFA5', // Turquesa
            '#5D7A91', // Azul grisáceo del sidebar
            '#E0E0E0'  // Gris claro
          ],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%', // Esto hace que sea un Donut y no un Pie chart
        plugins: {
          legend: {
            position: 'bottom',
            labels: { usePointStyle: true, padding: 20 }
          }
        }
      }
    });
  }

}
