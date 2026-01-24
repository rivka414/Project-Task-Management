import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment/environment.prod';
interface Team {
  id: number;
  name: string;
  created_at: string;
  membersCount: number;
}
@Injectable({
  providedIn: 'root',
})
export class TeamsService {
   private apiUrl = `${environment.apiUrl}/api/teams`;

   private http=inject(HttpClient);

  getTeams(token: string): Observable<Team[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Team[]>(this.apiUrl, { headers });
  }
  createTeam(name: string, token: string) {
  const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  return this.http.post<any>('http://localhost:3000/api/teams', { name }, { headers });
}

addMemberToTeam(teamId: string, userId: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    // הנתיב לפי ה-API שקיבלת: /api/teams/:teamId/members
    return this.http.post(`${this.apiUrl}/${teamId}/members`, { userId }, { headers });
  }
}
