import { Component, HostListener, signal, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cursor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cursor-dot" [style.transform]="'translate3d(' + mouseX() + 'px, ' + mouseY() + 'px, 0)'"></div>
    <div class="cursor-outline" 
         [class.hovering]="isHovering()"
         [style.transform]="'translate3d(' + outlineX + 'px, ' + outlineY + 'px, 0)'">
    </div>
  `,
  styles: [`
    :host {
      pointer-events: none;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999;
      mix-blend-mode: difference; /* Invierte el color del fondo (Blanco en negro, Negro en blanco) */
    }

    .cursor-dot {
      width: 8px;
      height: 8px;
      background-color: white;
      border-radius: 50%;
      position: absolute;
      top: -4px; /* Centrar */
      left: -4px;
      will-change: transform;
    }

    .cursor-outline {
      width: 40px;
      height: 40px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      position: absolute;
      top: -20px;
      left: -20px;
      will-change: transform;
      transition: width 0.3s, height 0.3s, background-color 0.3s;
    }

    /* Estado cuando pasa sobre un link o botón */
    .cursor-outline.hovering {
      width: 60px;
      height: 60px;
      background-color: rgba(255, 255, 255, 0.1);
      border-color: transparent;
    }

    /* Ocultar en móviles/tablets para no estorbar */
    @media (hover: none) and (pointer: coarse) {
      :host { display: none; }
    }
  `]
})
export class CursorComponent implements OnInit {
  mouseX = signal(0);
  mouseY = signal(0);
  
  // Coordenadas para el círculo que persigue (outline)
  outlineX = 0;
  outlineY = 0;
  
  isHovering = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.animateOutline();
      this.detectHoverables();
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouseX.set(e.clientX);
    this.mouseY.set(e.clientY);
  }

  // Loop de animación para suavidad extrema (60fps)
  animateOutline() {
    const speed = 0.15; // Ajusta esto para más o menos "lag"
    
    const loop = () => {
      // Interpolación lineal (Lerp)
      this.outlineX += (this.mouseX() - this.outlineX) * speed;
      this.outlineY += (this.mouseY() - this.outlineY) * speed;
      
      requestAnimationFrame(loop);
    };
    loop();
  }

  // Detectar si estamos sobre un elemento clicable
  detectHoverables() {
    document.addEventListener('mouseover', (e) => {
      const target = e.target as HTMLElement;
      // Si el elemento es un enlace, botón o tiene la clase 'pointer'
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button') || target.classList.contains('project-card')) {
        this.isHovering.set(true);
      } else {
        this.isHovering.set(false);
      }
    });
  }
}