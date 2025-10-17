import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Authentication {

  constructor(private http: HttpClient){}

  private baseUrl = 'ldiis.depedleytedivision.com';

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login.php`, { username, password });
  }
  
}



