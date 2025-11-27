import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para *ngFor

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent {
  
  // Tus proyectos definidos como datos. 
  // 'size' define si la tarjeta es normal, ancha (wide) o alta (tall) para el efecto Bento.
  proyectos = [
    {
      titulo: 'E-Commerce App',
      tags: ['Angular', 'Node.js', 'Stripe'],
      imagen: 'https://images.pexels.com/photos/34577/pexels-photo.jpg',
      size: 'wide' // Ocupará 2 columnas
    },
    {
      titulo: 'Dashboard Financiero',
      tags: ['Angular', 'D3.js'],
      imagen: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg',
      size: 'normal'
    },
    {
      titulo: 'App de Salud Mental',
      tags: ['PWA', 'TypeScript'],
      imagen: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg',
      size: 'normal'
    },
    {
      titulo: 'Portafolio Fotográfico',
      tags: ['CSS Grid', 'Animations'],
      imagen: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg',
      size: 'tall' // Ocupará 2 filas
    },
    {
      titulo: 'Chat en Tiempo Real',
      tags: ['Socket.io', 'Firebase'],
      imagen: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg',
      size: 'normal'
    }
  ];
}