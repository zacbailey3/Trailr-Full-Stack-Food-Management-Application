import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface InventoryItem {
  id?: number;
  itemName: string;
  quantity: number;
  unit: string;
  reorderLevel: number;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryItemService {

  private apiUrl = 'http://localhost:8080/api/inventory';

  constructor(private http: HttpClient) {}

  /*
   Retrieves all inventory items from backend API.
  */
  getInventoryItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.apiUrl);
  }

  /*
   Creates a new inventory item.
  */
  createInventoryItem(item: InventoryItem): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(this.apiUrl, item);
  }

  /*
   Updates an existing inventory item.
  */
  updateInventoryItem(id: number, item: InventoryItem): Observable<InventoryItem> {
    return this.http.put<InventoryItem>(`${this.apiUrl}/${id}`, item);
  }

  /*
   Deletes an inventory item.
  */
  deleteInventoryItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /*
   Searches inventory items by partial item name matches.
  */
  searchInventoryItems(itemName: string): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(
      `${this.apiUrl}/search?itemName=${itemName}`
    );
  }
}
