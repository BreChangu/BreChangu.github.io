import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// Borré HttpClientModule porque ya no se usa aquí (lo pusimos en app.config.ts)
import { HttpClient } from '@angular/common/http'; 
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  // Inyección moderna
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  contactForm: FormGroup;
  isSubmitting = signal(false);
  emailCopied = signal(false);

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting.set(true);
      const formData = this.contactForm.value;

      // TU URL DE RENDER
      const backendUrl = 'https://backend-portafolio-43oa.onrender.com/send-email';

      this.http.post(backendUrl, formData).subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.contactForm.reset();
          alert('¡Recibido! Estaré en contacto pronto. 🚀');
        },
        // --- AQUÍ ESTABA EL ERROR ---
        // Le agregamos ": any" para que TypeScript deje de quejarse
        error: (err: any) => { 
          console.error(err);
          this.isSubmitting.set(false);
          alert('Hubo un error técnico. Intenta por WhatsApp.');
        }
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  copyEmail() {
    const email = 'cfarzate@gmail.com'; 
    navigator.clipboard.writeText(email).then(() => {
      this.emailCopied.set(true);
      setTimeout(() => this.emailCopied.set(false), 2000);
    });
  }
}