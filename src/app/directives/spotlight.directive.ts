import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSpotlight]',
  standalone: true
})
export class SpotlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    
    // Coordenadas del mouse dentro de la tarjeta
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Centro de la tarjeta
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Cálculo de rotación (Max 15 grados)
    const rotateX = ((y - centerY) / centerY) * -10; // Invertido para naturalidad
    const rotateY = ((x - centerX) / centerX) * 10;

    // Inyectamos las variables al CSS
    this.renderer.setStyle(this.el.nativeElement, '--mouse-x', `${x}px`);
    this.renderer.setStyle(this.el.nativeElement, '--mouse-y', `${y}px`);
    this.renderer.setStyle(this.el.nativeElement, '--rotate-x', `${rotateX}deg`);
    this.renderer.setStyle(this.el.nativeElement, '--rotate-y', `${rotateY}deg`);
    this.renderer.setStyle(this.el.nativeElement, '--bg-opacity', '1'); // Enciende el brillo
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    // Al salir, regresamos la tarjeta a su posición original suavemente
    this.renderer.setStyle(this.el.nativeElement, '--rotate-x', '0deg');
    this.renderer.setStyle(this.el.nativeElement, '--rotate-y', '0deg');
    this.renderer.setStyle(this.el.nativeElement, '--bg-opacity', '0'); // Apaga el brillo
  }
}