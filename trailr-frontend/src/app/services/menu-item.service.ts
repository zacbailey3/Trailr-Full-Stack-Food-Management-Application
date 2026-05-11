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

//udpated for deployment
  private apiUrl = 'https://trailr-backend.up.railway.app/api/menu-items';

  constructor(private http: HttpClient) { }

  // Gets all menu items from the Spring Boot backend.
  getMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.apiUrl);
  }

  // Sends a new menu item to the backend to be saved in the database.
  createMenuItem(menuItem: MenuItem): Observable<MenuItem> {
    return this.http.post<MenuItem>(this.apiUrl, menuItem);
  }

  // Updates an existing menu item in the database.
  updateMenuItem(id: number, menuItem: MenuItem): Observable<MenuItem> {
    return this.http.put<MenuItem>(`${this.apiUrl}/${id}`, menuItem);
  }

  // Deletes a menu item from the database by ID.
  deleteMenuItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Searches menu items by partial name matches.
  searchMenuItems(itemName: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(
      `${this.apiUrl}/search?itemName=${itemName}`
    );
  }


}
