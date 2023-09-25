import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { IBarang } from 'src/app/interfaces/i-barang';
import { ISupplier } from 'src/app/interfaces/i-supplier';
import { BarangModel } from 'src/app/models/barang-model';
import { SupplierModel } from 'src/app/models/supplier-model';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent {

  supplier: ISupplier[];
  barang: IBarang[];
  id: String = ""

  constructor(private supplierService: SupplierService, private http: HttpClient) {
    this.barang = [new BarangModel()]
    this.supplier = [new SupplierModel()]
  }

  ngOnInit(): void {
    this.getSupplier();
    this.getBarang(this.id);
  }

  getSupplier() {
    this.supplierService.all().pipe(catchError(this.handleError)).subscribe((resp: any) => {
      this.supplier = resp;
      // console.log(this.supplier[0].listBarang)
    });
  }

  getBarang(id: any) {
    console.log(this.supplier[id].listBarang)
  }

  public handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

}
