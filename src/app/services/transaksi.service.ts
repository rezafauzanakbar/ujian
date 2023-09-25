import { Injectable } from '@angular/core';
import { ITransaksi } from '../interfaces/i-transaksi';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransaksiService {

  private baseURLTransaction = "https://c701-223-255-229-67.ngrok-free.app/barang-in/";
  private token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlydmFucmVwYWxkby53b3JrQGdtYWlsLmNvbSIsImlhdCI6MTY5NTYwODE2MywiZXhwIjoxNzAyODA4MTYzfQ.xpPWqvf_6kMxZJykaM3i1DBzqgfj6ZQzyxUJopkDy7c";

  constructor(private http: HttpClient) { }

  public create(transaksi: ITransaksi): Observable<ITransaksi> {
    const headers = {
      "Content-Type": "application/json",
      "x-access-token": `${this.token}`,
    }
    const body = JSON.stringify(transaksi);
    console.log(body)
    return this.http.post<any>(
      `${this.baseURLTransaction}`, body, { headers }
    )
  }

  public all(): Observable<ITransaksi[]> {
    const headers = {
      "Content-Type": "application/json",
      "x-access-token": `${this.token}`,
    }
    return this.http.get<ITransaksi[]>(`${this.baseURLTransaction}`, {
      headers,
    });
  }

}
