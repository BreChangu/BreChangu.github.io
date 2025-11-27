import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuOpen = false;
  isScrolled = false;

  // Detectar scroll para efecto glassmorphism
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50; // Se activa después de 50px de scroll
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    
    // Bloquear el scroll del body cuando el menú está abierto
    if (this.menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  closeMenu() {
    this.menuOpen = false;
    document.body.style.overflow = 'auto';
  }
}