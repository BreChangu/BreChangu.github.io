import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { HeroComponent } from './componentes/hero/hero.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';

@Component({
  selector: 'app-root',
  standalone: true, // ← importante
  imports: [RouterOutlet, NavbarComponent,HeroComponent,ProyectosComponent], // ← agrega el Navbar aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portafolio';
}
