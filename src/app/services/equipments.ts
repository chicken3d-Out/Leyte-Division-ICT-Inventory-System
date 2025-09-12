import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Equipments {
  private baseUrl = 'http://localhost/inventory-api';

  constructor(private http:HttpClient){

  }

   //Add Equipment
  addEquipment(data:any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/insert-equipment.php`, data)
  }

  //Get Equipment
  getEquipments(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get-equipment.php`);
  }

  getEquipmentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get-equipment-id.php?id=${id}`);
  }

  updateEquipment(data: any): Observable<any> {
    const httpHeader = new HttpHeaders();
    httpHeader.append('Content-Type', 'Application/JSON');
    
    return this.http.put(`${this.baseUrl}/update-equipment.php`, data, { headers: httpHeader });
  }


  
}
