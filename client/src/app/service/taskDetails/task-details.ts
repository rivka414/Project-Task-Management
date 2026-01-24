import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskDetails {
 private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/tasks';

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // שליפת משימות לפי פרויקט (שימוש במסנן projectId כפי שמופיע בהוראות)
  getTasksByProject(projectId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?projectId=${projectId}`, { headers: this.getHeaders() });
  }

  createTask(taskData: any): Observable<any> {
  return this.http.post(this.apiUrl, taskData, { headers: this.getHeaders() });
}

// עדכון משימה (תומך בסטטוס ועדיפות)
updateTask(taskId: string, updates: { status?: string, priority?: string }): Observable<any> {
  return this.http.patch(`${this.apiUrl}/${taskId}`, updates, { headers: this.getHeaders() });
}

  // מחיקת משימה (DELETE /api/tasks/:id)
  deleteTask(taskId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${taskId}`, { headers: this.getHeaders() });
  }
}
