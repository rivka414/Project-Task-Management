import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServerCalls {
  private baseUrl = 'http://localhost:3000';
private http = inject(HttpClient);
  

  login(data: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/auth/login`, data);
  }

  register(data: { name: string, email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/auth/register`, data);
  }



  
}
