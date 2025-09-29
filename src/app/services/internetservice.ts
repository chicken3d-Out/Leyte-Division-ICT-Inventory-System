import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Internetservice {
  constructor(private http: HttpClient){}

  private baseUrl = 'http://localhost/inventory-api';


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
    return this.http.post(`${this.baseUrl}/save_internet_service.php`, data);
  }

  // Step 3: Cellular service
  saveCellularService(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/save_cellular_service.php`, data);
  }
  
}
