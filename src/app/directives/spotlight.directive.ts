import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSpotlight]',
  standalone: true
})
export class SpotlightDirective {
  private scheduledAnimationFrame = false; // Bandera para controlar la velocidad

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    // Si ya hay una actualización pendiente, ignoramos este evento (evita sobrecarga)
    if (this.scheduledAnimationFrame) { return; }

    this.scheduledAnimationFrame = true;

    // Ejecutamos la lógica justo antes del siguiente repintado de pantalla
    requestAnimationFrame(() => {
      this.updatePosition(event);
      this.scheduledAnimationFrame = false;
    });
  }

  // Sacamos la lógica matemática a una función aparte
  private updatePosition(event: MouseEvent) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Suavizamos un poco más la rotación (dividir entre 15 o 20 es más sutil)
    const rotateX = ((y - centerY) / centerY) * -8; 
    const rotateY = ((x - centerX) / centerX) * 8;

    this.renderer.setStyle(this.el.nativeElement, '--mouse-x', `${x}px`);
    this.renderer.setStyle(this.el.nativeElement, '--mouse-y', `${y}px`);
    this.renderer.setStyle(this.el.nativeElement, '--rotate-x', `${rotateX}deg`);
    this.renderer.setStyle(this.el.nativeElement, '--rotate-y', `${rotateY}deg`);
    this.renderer.setStyle(this.el.nativeElement, '--bg-opacity', '1');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, '--rotate-x', '0deg');
    this.renderer.setStyle(this.el.nativeElement, '--rotate-y', '0deg');
    this.renderer.setStyle(this.el.nativeElement, '--bg-opacity', '0');
  }
}