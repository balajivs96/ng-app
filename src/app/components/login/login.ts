import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Apiendpoint } from '../../services/apiendpoint';
import { Router } from '@angular/router';
import { loginSuccess } from '../../store/auth/auth.actions';

import { Store } from '@ngrx/store';


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
  store = inject(Store);
  onSubmit(form: NgForm) {
    let { email, password } = this.loginForm;
    if (form.valid) {
      this.api.login(this.loginForm).subscribe({
        next: (response) => {
          this.store.dispatch(loginSuccess({ user: { email } }));
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