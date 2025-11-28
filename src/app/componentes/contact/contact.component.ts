import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = signal(false);
  emailCopied = signal(false);

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting.set(true);
      // Aquí iría tu lógica de envío (ej: EmailJS o Backend)
      setTimeout(() => {
        this.isSubmitting.set(false);
        this.contactForm.reset();
        alert('¡Mensaje enviado con estilo! 🚀');
      }, 2000);
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  copyEmail() {
    const email = 'tuemail@gmail.com'; // Pon tu correo real aquí
    navigator.clipboard.writeText(email).then(() => {
      this.emailCopied.set(true);
      setTimeout(() => this.emailCopied.set(false), 2000); // Reset mensaje después de 2s
    });
  }
}