import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root',
})
export class ServerCalls {
 private apiUrl = `${environment.apiUrl}`;
private http = inject(HttpClient);
  

  login(data: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/auth/login`, data);
  }

  register(data: { name: string, email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/auth/register`, data);
  }



  
}
