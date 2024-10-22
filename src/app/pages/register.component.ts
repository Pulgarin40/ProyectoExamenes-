import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <div class="register-container">
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <h2>Register</h2>
        <label>Email</label>
        <input formControlName="email" type="email" />
        <label>Password</label>
        <input [type]="showPassword ? 'text' : 'password'" formControlName="password" />
        <label>Confirm Password</label>
        <input [type]="showPassword ? 'text' : 'password'" formControlName="confirmPassword" />
        <div>
          <input type="checkbox" (change)="toggleShowPassword()"> Show Password
        </div>
        <button type="submit" [disabled]="registerForm.invalid">Register</button>
        <p *ngIf="errorMessage">{{ errorMessage }}</p>
      </form>
    </div>
  `,
  styles: [`
    .register-container {
      max-width: 400px;
      margin: 0 auto;
      padding: 1em;
    }
    form {
      display: flex;
      flex-direction: column;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')!.value === form.get('confirmPassword')!.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => this.router.navigate(['/login']),
        error: (err) => this.errorMessage = 'Registration failed',
      });
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}