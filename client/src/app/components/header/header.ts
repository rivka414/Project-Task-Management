import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthState, User } from '../../store/state';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn, selectUser } from '../../store/selector';
import { logout } from '../../store/actions';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isLoggedIn$: Observable<boolean>;
  user$: Observable<User | null>;
  private router=inject(Router);

  links = [
    { label: 'Teams', path: '/teams' },
    { label: 'Projects', path: '/projects' },
    { label: 'Tasks', path: '/tasks' },
  ];

  constructor(private store: Store) {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.user$ = this.store.select(selectUser);
  }

  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }
}
