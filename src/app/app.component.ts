import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { HeroComponent } from './componentes/hero/hero.component';

@Component({
  selector: 'app-root',
  standalone: true, // ← importante
  imports: [RouterOutlet, NavbarComponent,HeroComponent], // ← agrega el Navbar aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portafolio';
}
