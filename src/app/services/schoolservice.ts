import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class Schoolservice {

  // private baseUrl = 'https://ldiis.depedleytedivision.com';
  private baseUrl = environment.apiUrl;
  // private baseUrl = environment.apiUrl;

  constructor(private http:HttpClient){

  }

  getSchool(schoolId: string) {
  return this.http.get<any>(`${this.baseUrl}/get-school.php?school_id=${schoolId}`);
}

  updateSchool(schoolId: string, formData: FormData) {
  return this.http.post(`${this.baseUrl}/update-school.php?school_id=${schoolId}`, formData);
}

  
}
