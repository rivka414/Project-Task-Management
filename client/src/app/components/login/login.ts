import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ServerCalls } from '../../service/login/server-calls';
import confetti from 'canvas-confetti';
import { Store } from '@ngrx/store';

import { loginSuccess } from '../../store/actions';
import { Observable } from 'rxjs';
import { AuthState } from '../../store/state';
import { selectAuthState } from '../../store/selector';


@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  isRegister = false;
  authForm: FormGroup;
  user$: Observable<any>;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private authService: ServerCalls, private store: Store<AuthState>) {
    this.authForm = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.user$ = this.store.select(selectAuthState);
  }


  toggleMode() {
    this.isRegister = !this.isRegister;

    // Name חובה רק אם במצב הרשמה
    if (this.isRegister) {
      this.authForm.get('name')?.setValidators([Validators.required]);
    } else {
      this.authForm.get('name')?.clearValidators();
    }
    this.authForm.get('name')?.updateValueAndValidity();
  }
  submit() {
    if (this.authForm.invalid) return;

    if (this.isRegister) {
      this.authService.register(this.authForm.value).subscribe({
        next: (res) => {
          this.store.dispatch(loginSuccess({ user: res.user, token: res.token }));
          this.launchConfetti();
          this.router.navigate(['/teams']);
        },
        error: () => alert('שגיאה בהרשמה- האימייל כבר קיים')
      });
    } else {
      this.authService.login(this.authForm.value).subscribe({
        next: (res) => {
          this.store.dispatch(loginSuccess({ user: res.user, token: res.token }));
          this.launchConfetti();
          this.router.navigate(['/teams']);
        },
        error: () => alert('אימייל או סיסמה שגויים')
      });
    }
  }


  private launchConfetti() {
    const duration = 3 * 1000; // 3 שניות
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 }, // צד שמאל של המסך
        colors: ['#4facfe', '#00f2fe', '#a777e3']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 }, // צד ימין של המסך
        colors: ['#4facfe', '#00f2fe', '#a777e3']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }
}