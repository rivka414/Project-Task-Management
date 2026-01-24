import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamDetailsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/projects';

  // פונקציה שמביאה את כל הפרויקטים ומסננת לפי צוות
getProjectsByTeam(teamId: string): Observable<any[]> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
    map(projects => {
      // שינינו ל-p.team_id כדי להתאים ל-Response של השרת
      return projects.filter(p => p.team_id == teamId);
    })
  );
}

  // יצירת פרויקט חדש
createProject(projectName: string, description: string, teamId: string): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  const body = { 
    name: projectName, 
    description: description, // הוספת התיאור לגוף הבקשה
    teamId: teamId 
  };

  return this.http.post(this.apiUrl, body, { headers });
}
}
