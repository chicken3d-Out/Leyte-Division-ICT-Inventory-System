import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class Authentication {

  constructor(private http: HttpClient){}

  // private baseUrl = 'https://ldiis.depedleytedivision.com';
  private baseUrl = environment.apiUrl;

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login.php`, { username, password });
  }
  
}



