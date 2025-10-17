import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Internetservice {
  constructor(private http: HttpClient){}

  private baseUrl = 'https://srv995-files.hstgr.io/ict-inventory';


  // Step 1: Internet connectivity
  saveInternetConnectivity(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/insert_netconnectivity.php`, data);
  }
  getLatestInternetConnectivity(school_id: string):Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get_netconnectivity.php`,{
    params: { school_id }});

  }

  // Step 2: Internet service provider
  saveInternetService(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/insert_isp.php`, data);
  }
  getInternetService(schoolId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get_isp.php?school_id=${schoolId}`);
  }
  getISPById(id: number): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/get_isp_byid.php?id=${id}`);
}
  updateISP(data: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/update-isp.php`, data);
}
deleteISP(id: number) {
  return this.http.delete<any>(`${this.baseUrl}/isp-delete.php?id=${id}`);
}



  // Step 3: Cellular service
  addCellularService(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/insert-cellular.php`, data);
  }
  
}
