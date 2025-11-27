import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router'; // Importa RouterModule para routerLink
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { HeroComponent } from './componentes/hero/hero.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  // Asegúrate de importar RouterModule para que funcione el botón de contacto
  imports: [CommonModule, RouterOutlet, RouterModule, NavbarComponent, HeroComponent, ProyectosComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'Fernando Arzate';

  // Lógica para la animación al hacer scroll
  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0.1 // Se activa cuando el 10% del elemento es visible
    });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));
  }
}