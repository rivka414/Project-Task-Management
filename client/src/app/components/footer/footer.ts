import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  private router=inject(Router);
  handleNavigation(event: Event, path: string) {
    event.preventDefault(); // מונע את הניווט האוטומטי של הקישור

    const token = localStorage.getItem('token');

    if (token) {
      // אם קיים טוקן, נווט ליעד
      this.router.navigate([path]);
    } else {
      // אם לא קיים, הצג הודעה למשתמש
      alert('עליך להתחבר או להירשם למערכת כדי לגשת לדף זה.');
      // אופציונלי: העברה לדף התחברות
      // this.router.navigate(['/login']);
    }
  }
}
