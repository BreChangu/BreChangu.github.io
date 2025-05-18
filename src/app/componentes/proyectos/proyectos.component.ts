import { Component } from '@angular/core';

@Component({
  selector: 'app-proyectos',
  standalone: true, // Hace que el componente sea independiente
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent {
  selectedCard: HTMLElement | null = null;

  expandCard(event: Event): void {
    const element = event.currentTarget as HTMLElement;

    if (this.selectedCard === element) {
      this.selectedCard.classList.remove("expanded");
      this.selectedCard = null;
    } else {
      if (this.selectedCard) {
        this.selectedCard.classList.remove("expanded");
      }
      element.classList.add("expanded");
      this.selectedCard = element;
    }
  }
}
