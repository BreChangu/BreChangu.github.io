import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotlightDirective } from '../../directives/spotlight.directive';

// 1. Solo agregamos los campos opcionales (?) necesarios para el nuevo diseño
interface Project {
  titulo: string;
  descripcionCorta: string;
  descripcionLarga: string;
  tags: string[];
  imagen: string; 
  galeria?: string[];
  size: 'normal' | 'wide' | 'tall';
  year: string;
  role: string;
  linkDemo?: string;
  linkGithub?: string;
  
  // --- AGREGADOS PARA QUE NO DE ERROR (OPCIONALES) ---
  isNDA?: boolean;
  challenge?: string;
  solution?: string;
  features?: string[];
}

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule, SpotlightDirective],
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent {

  selectedProject = signal<Project | null>(null);
  currentSlide = signal(0);

  // 2. tarjeta NDA al final
  proyectos: Project[] = [
    {
      titulo: 'Asper Website',
      descripcionCorta: 'Desarrollo integral UX/UI.',
      descripcionLarga: 'Lideré el desarrollo completo del sitio web para Asper. El reto principal fue traducir la identidad de marca en una interfaz interactiva.',
      
      // Datos extra para el modal (Opcionales, si quieres llenarlos después)
      challenge: 'Crear una identidad digital que inspire confianza y modernidad.',
      solution: 'Implementación de Angular 18 con animaciones fluidas y optimización de carga.',
      features: ['Diseño Responsivo', 'Animaciones CSS', 'Formulario de Contacto'],

      tags: ['Angular', 'Figma'],
      imagen: 'imagenes/Asper-home.PNG', // TUS RUTAS ORIGINALES
      galeria: [
        'imagenes/asper-servicios.PNG',
        'imagenes/asper-nosotros.PNG',
        'imagenes/asper-esencia.PNG',
        'imagenes/asper-contacto.PNG'
      ],
      size: 'wide',
      year: '2024',
      role: 'Lead Dev'
    },
    {
      titulo: 'Botiquín Familiar',
      descripcionCorta: 'Desarrollo integral UX/UI.',
      descripcionLarga: 'Lideré el desarrollo del sitio web. El reto principal fue hacer de un tema complejo algo interactivo.',
      
      challenge: 'Hacer accesible información médica compleja para familias.',
      solution: 'Diseño de interfaz intuitiva con tarjetas interactivas y búsqueda rápida.',
      features: ['Búsqueda en tiempo real', 'Accesibilidad Web'],

      tags: ['Angular', 'Figma', 'Illustrator'],
      imagen: 'imagenes/botiquin.PNG', // RUTAS ORIGINALES
      galeria: [
        'imagenes/asper-contacto.PNG', //  rutas originales
        'assets/asper-detail-1.jpg',
        'assets/asper-mobile.jpg'
      ],
      size: 'normal',
      year: '2025',
      role: 'Lead Dev'
    },

    // --- 3. SOLO AGREGUÉ ESTA TARJETA AL FINAL (Para rellenar el grid) ---
    {
      titulo: 'Proyectos Confidenciales',
      descripcionCorta: 'Desarrollos internos bajo NDA.',
      descripcionLarga: 'Proyectos corporativos protegidos por acuerdos de confidencialidad.',
      tags: ['Fintech', 'Corporate', 'Internal Tools'],
      imagen: '', // Sin imagen
      size: 'wide',
      year: '2023-2025',
      role: 'Full Stack Dev',
      isNDA: true // Esto activa el candado
    }
  ];

  // --- TU LÓGICA ORIGINAL (Intacta) ---
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.selectedProject()) return;

    if (event.key === 'Escape') {
      this.closeProject();
    }

    if (this.selectedProject()?.galeria) {
      if (event.key === 'ArrowRight') {
        this.nextSlide();
      }
      if (event.key === 'ArrowLeft') {
        this.prevSlide();
      }
    }
  }

  openProject(project: Project) {
    this.selectedProject.set(project);
    this.currentSlide.set(0);
    document.body.style.overflow = 'hidden'; 
  }

  closeProject() {
    this.selectedProject.set(null);
    document.body.style.overflow = 'auto';
  }

  nextSlide(e?: Event) {
    e?.stopPropagation();
    const gallery = this.selectedProject()?.galeria;
    if (gallery) {
      this.currentSlide.update(i => (i === gallery.length - 1 ? 0 : i + 1));
    }
  }

  prevSlide(e?: Event) {
    e?.stopPropagation();
    const gallery = this.selectedProject()?.galeria;
    if (gallery) {
      this.currentSlide.update(i => (i === 0 ? gallery.length - 1 : i - 1));
    }
  }
}