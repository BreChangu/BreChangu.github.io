import { Component, signal, inject } from '@angular/core'; // <--- 1. Importamos inject
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  // 2. Inyectamos las dependencias aquí directamente
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  contactForm: FormGroup;
  isSubmitting = signal(false);
  emailCopied = signal(false);

  constructor() {
    // 3. El constructor queda más limpio, solo para lógica de inicio
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

      // TU URL DE RENDER CON RESEND
      const backendUrl = 'https://backend-portafolio-43oa.onrender.com/send-email';

      this.http.post(backendUrl, formData).subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.contactForm.reset();
          alert('¡Recibido! Estaré en contacto pronto. 🚀');
        },
        error: (err) => {
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