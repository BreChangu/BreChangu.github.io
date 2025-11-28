import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common'; // Importante: isPlatformBrowser
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { HeroComponent } from './componentes/hero/hero.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { ContactComponent } from './componentes/contact/contact.component';
import { ExperienceComponent } from "./componentes/experience/experience.component";
import { CursorComponent } from './componentes/ui/cursor/cursor.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, NavbarComponent, HeroComponent, ProyectosComponent, FooterComponent, ContactComponent, ExperienceComponent,CursorComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'Fernando Arzate';

  // Inyectamos el ID de la plataforma para saber si estamos en el navegador
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    // 1. Verificamos que estemos en el navegador (evita errores si usas SSR en el futuro)
    if (isPlatformBrowser(this.platformId)) {
      
      // 2. El truco: setTimeout con tiempo 0 o bajo.
      // Esto mueve la ejecución al final de la pila de tareas del navegador,
      // asegurando que el DOM ya se haya "pintado" visualmente.
      setTimeout(() => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              // Opcional: Dejar de observar una vez que ya apareció para ahorrar memoria
              observer.unobserve(entry.target); 
            }
          });
        }, {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px' // Un pequeño margen para que anime un poco antes de entrar del todo
        });

        const elements = document.querySelectorAll('.reveal-on-scroll');
        elements.forEach(el => observer.observe(el));
        
      }, 100); // 100ms es imperceptible para el ojo humano pero una eternidad para la CPU
    }
  }
}