import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Schoolservice {

  private baseUrl = 'https://srv995-files.hstgr.io/89c124184a80b22d/files/public_html/ict-inventory';

  constructor(private http:HttpClient){

  }

  getSchool(schoolId: string) {
  return this.http.get<any>(`${this.baseUrl}/get-school.php?school_id=${schoolId}`);
}

  updateSchool(schoolId: string, formData: FormData) {
  return this.http.post(`${this.baseUrl}/update-school.php?school_id=${schoolId}`, formData);
}

  
}
