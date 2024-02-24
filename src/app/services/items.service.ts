import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Item } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private url = "http://localhost:3000/products";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http
      .get<Item[]>(`${this.url}`);
  }

  getItemById(id: string): Observable<Item[]> {
    return this.http
      .get<Item[]>(`${this.url}/${id}`);
  }
}
