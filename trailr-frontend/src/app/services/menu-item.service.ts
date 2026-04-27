import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MenuItem {
  id?: number;
  itemName: string;
  price: number;
  category: string;
  available: boolean;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {

  private apiUrl = 'http://localhost:8080/api/menu-items';

  constructor(private http: HttpClient) { }

  // Gets all menu items from the Spring Boot backend.
  getMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.apiUrl);
  }

  // Sends a new menu item to the backend to be saved in the database.
  createMenuItem(menuItem: MenuItem): Observable<MenuItem> {
    return this.http.post<MenuItem>(this.apiUrl, menuItem);
  }


}
