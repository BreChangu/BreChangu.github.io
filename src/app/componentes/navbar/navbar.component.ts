import { CommonModule } from '@angular/common';
import { Component,HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule] // Agregamos CommonModule aquí
})
export class NavbarComponent {
  menuOpen = false;
  navbarVisible = false;

  // Detectar cuando el usuario hace scroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset > 20) { // Cambia 100 por el valor que prefieras
      this.navbarVisible = true;
    } else {
      this.navbarVisible = false;
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
