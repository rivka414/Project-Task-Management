import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
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
  isLoading = false;
  authForm: FormGroup;
  user$: Observable<any>;
  private cdr = inject(ChangeDetectorRef);
  private fb: FormBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(ServerCalls);
  private store = inject(Store<AuthState>);
  constructor() {
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
  if (this.authForm.invalid || this.isLoading) return;

  this.isLoading = true;

  const request = this.isRegister 
    ? this.authService.register(this.authForm.value) 
    : this.authService.login(this.authForm.value);

  request.subscribe({
    next: (res) => {
      this.isLoading = false;
      this.cdr.detectChanges(); // עדכון מיידי של המסך
      this.store.dispatch(loginSuccess({ user: res.user, token: res.token }));
      this.launchConfetti();
      this.router.navigate(['/home']);
    },
    error: (err) => {
      this.isLoading = false; // 1. ביטול מצב הטעינה
      this.cdr.detectChanges(); // 2. הכרחת אנגולר לעדכן את ה-HTML (העיגול ייעלם עכשיו)

      // 3. הצגת הודעת השגיאה
      const message = this.isRegister ? 'שגיאה בהרשמה- האימייל כבר קיים' : 'אימייל או סיסמה שגויים';
      alert(message);
    }
  });
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