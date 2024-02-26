import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../interfaces/interfaces';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private url = environment.API+"products";

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
