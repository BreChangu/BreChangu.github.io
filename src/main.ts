import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config'; // <--- Importamos la config que tiene el HttpClient
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig) // <--- Pasamos esa config aquí
  .catch((err) => console.error(err));