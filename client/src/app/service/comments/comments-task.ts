import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentsTaskService {
  private http = inject(HttpClient);
private apiUrl = `${environment.apiUrl}`;
  // פונקציה לקבלת כותרות עם Token (במידה ויש אבטחה)
  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // שליפת כל ההערות עבור משימה ספציפית
  getComments(taskId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/comments?taskId=${taskId}`, { headers: this.getHeaders() });
  }

addComment(taskId: string, content: string): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
  
  // שינוי השם ל-body כפי שהשרת מצפה
  const payload = { 
    taskId: Number(taskId), 
    body: content // כאן היה רשום content, שינינו ל-body
  };


  return this.http.post(`${this.apiUrl}/api/comments`, payload, { headers });
}
}
