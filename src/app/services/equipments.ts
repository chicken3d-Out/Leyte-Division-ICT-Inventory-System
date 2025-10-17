import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Equipments {
  private baseUrl = 'https://ldiis.depedleytedivision.com';

  constructor(private http:HttpClient){

  }

   //Add Equipment
  addEquipment(data:any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/insert-equipment.php`, data)
  }

  //Get Equipment
  getEquipments(schoolID:String): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get-equipment.php?school_id=${schoolID}`);
  }

  getEquipmentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get-equipment-id.php?id=${id}`);
  }

  updateEquipment(data: any): Observable<any> {
    const httpHeader = new HttpHeaders();
    httpHeader.append('Content-Type', 'Application/JSON');
    
    return this.http.put(`${this.baseUrl}/update-equipment.php`, data, { headers: httpHeader });
  }
  deleteEquipment(id: number) {
  return this.http.delete<any>(`${this.baseUrl}/delete-equipment.php?id=${id}`);
}



  //GET ALL SCHOOLID
  getAllSchoolIds(): Observable<string[]> {
    return this.http
      .get<{ school_id: string }[]>(`${this.baseUrl}/get-all-school-ids.php`)
      .pipe(map(res => res.map(r => r.school_id)));
  }


  //DASHBOARD API
  getEquipmentStats(schoolId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-equipment-stat.php?school_id=${schoolId}`);
  }

  getStatusStats(schoolId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-status-stats.php?school_id=${schoolId}`);
  }

  getPurposeStats(schoolId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-purpose-stats.php?school_id=${schoolId}`);
  }

  getFundSourceStats(schoolId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-fundsource-stats.php?school_id=${schoolId}`);
  }

  getBatchStats(schoolId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-batch-stats.php?school_id=${schoolId}`);
  }


  //LEYTE DIVISION DASHBOARD ALL
  //DASHBOARD API
  getEquipmentStatsAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-equipment-stat-all.php`);
  }

  getStatusStatsAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-status-stats-all.php`);
  }

  getPurposeStatsAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-purpose-stats-all.php`);
  }

  getFundSourceStatsAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-fundsource-stats-all.php`);
  }

  getBatchStatsAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-batch-stats-all.php`);
  }


  //BY DISTRICT AND AREA FILTER
  getStatsByArea(area: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-equipment-stat-area.php?area=${area}`);
  }

  // 
  getStatsByDistrict(district: string): Observable<any[]>  {
    return this.http.get<any[]> (`${this.baseUrl}/get-equipment-stat-district.php?district=${district}`);
  }

  getPurposeByArea(area: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/get-purpose-by-area.php?area=${area}`);
  }

  getPurposeByDistrict(district: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-purpose-by-district.php?district=${district}`);
  }


  getEquipmentByArea(area: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/get-equipment-by-area.php`, {
    params: { area }
  });
}

  getEquipmentByDistrict(district: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-equipment-by-district.php`, {
      params: { district }
    });
  }


  getDcpBatchByArea(area: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-dcp-batch-by-area.php`, {
      params: { area }
    });
  }

  getDcpBatchByDistrict(district: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-dcp-batch-by-district.php`, {
      params: { district }
    });
  }


  getFundSourceByArea(area: string) {
    return this.http.get<any[]>(`${this.baseUrl}/get-fundsource-by-area.php?area=${area}`);
  }

  getFundSourceByDistrict(district: string) {
    return this.http.get<any[]>(`${this.baseUrl}/get-fundsource-by-district.php?district=${district}`);
  }




}
