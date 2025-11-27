import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent { 
  // Aquí podrías agregar lógica si quisieras que el "scroll" fuera automático al hacer click
  scrollToProjects() {
    const projectsSection = document.getElementById('proyectos');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}