import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISupplier } from '../interfaces/i-supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private baseURL = "https://c701-223-255-229-67.ngrok-free.app/suppliers";
  private token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlydmFucmVwYWxkby53b3JrQGdtYWlsLmNvbSIsImlhdCI6MTY5NTYwODE2MywiZXhwIjoxNzAyODA4MTYzfQ.xpPWqvf_6kMxZJykaM3i1DBzqgfj6ZQzyxUJopkDy7c";

  constructor(private http: HttpClient) { }

  public all(): Observable<ISupplier[]> {
    const headers = {
      "Content-Type": "application/json",
      "x-access-token": `${this.token}`,
    }
    return this.http.get<ISupplier[]>(`${this.baseURL}`, {
      headers,
    });
  }
}
