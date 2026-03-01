import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Apiendpoint } from '../../services/apiendpoint';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm = {
    email: '',
    password: ''
  }

  api = inject(Apiendpoint);
  router = inject(Router);
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.api.login(this.loginForm).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Login failed:', error);
        }
      });
    } else {
      console.log('Form invalid');
      form.control.markAllAsTouched(); // trigger validation messages
    }
  }
}