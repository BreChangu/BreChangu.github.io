import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Job {
  company: string;
  role: string;
  period: string;
  description: string;
  badges: string[]; // Para mostrar skills usadas en ese trabajo
  active?: boolean; // Para el trabajo actual
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  
  jobs: Job[] = [
    {
      company: 'Ardic',
      role: 'Especialista de Calidad y Operaciones',
      period: 'Junio 2025 - Actual', // Fecha basada en tu CV
      description: 'Supervisión de procesos y auditoría de calidad, mejorando la eficiencia operativa en un 15%. Soporte en diseño gráfico para material visual interno.',
      badges: ['Gestión', 'Procesos', 'Diseño Gráfico'],
      active: true
    },
    {
      company: 'Freelance',
      role: 'Desarrollador Front-End',
      period: 'Agosto 2023 - Marzo 2025',
      description: 'Diseño y maquetación de 10+ sitios web responsivos. Lideré el desarrollo del sitio "Asper" desde UX/UI hasta código.',
      badges: ['Angular', 'HTML/CSS', 'UX/UI', 'Figma']
    },
    {
      company: 'Bunker',
      role: 'Diseñador Gráfico',
      period: 'Enero 2023 - Junio 2023',
      description: 'Diseño y desarrollo de decoraciones visuales a gran escala para retail. Coordinación con proveedores para producción e instalación.',
      badges: ['Gran Formato', 'Impresión', 'Logística']
    },
    {
      company: 'Distribuidora Torre Fuerte',
      role: 'Diseñador Gráfico',
      period: 'Febrero 2019 - Mayo 2023',
      description: 'Producción de 50+ materiales publicitarios y gestión integral de fotografía de producto y postproducción para e-commerce.',
      badges: ['Photoshop', 'Lightroom', 'E-commerce']
    },
    {
      company: 'Grupo Gráfico Romo',
      role: 'Diseñador / Retocador Digital',
      period: 'Mayo 2017 - Enero 2019',
      description: 'Especialista en postproducción y retoque digital para catálogos, corrección de color y diseño de identidad visual.',
      badges: ['Retoque Digital', 'Editorial', 'Identidad']
    }
  ];
}