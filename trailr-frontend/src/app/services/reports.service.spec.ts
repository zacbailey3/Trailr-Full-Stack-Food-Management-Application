import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MenuReport {
  title: string;
  generatedAt: string;
  menuItems: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiUrl = 'http://localhost:8080/api/reports';

  constructor(private http: HttpClient) {}

  /*
   Retrieves menu report data from the backend API.
  */
  getMenuReport(): Observable<MenuReport> {
    return this.http.get<MenuReport>(`${this.apiUrl}/menu`);
  }
}
