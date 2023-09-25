import { Component, OnInit } from '@angular/core';
import { ITransaksi } from 'src/app/interfaces/i-transaksi';
import { TransaksiModel } from 'src/app/models/transaksi-model';
import { TransaksiService } from 'src/app/services/transaksi.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ISupplier } from 'src/app/interfaces/i-supplier';
import { IBarang } from 'src/app/interfaces/i-barang';
import { BarangModel } from 'src/app/models/barang-model';
import { SupplierModel } from 'src/app/models/supplier-model';
import { SupplierService } from 'src/app/services/supplier.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.component.html',
  styleUrls: ['./transaksi.component.css']
})
export class TransaksiComponent implements OnInit {

  penampung: number = 0;
  penampungSupplier: number = 0;
  transaksi: ITransaksi;
  supplier: ISupplier[];
  barang: IBarang[];
  namaSupplier: String = ""
  transaction: ITransaksi[];
  addTransaction: ITransaksi = {
    tanggal: new Date,
    grandTotal: 0,
    supplier: [
      {
        _id: "",
        alamat: "",
        nama: "",
        listBarang: [
          {
            namaBarang: "",
            deskripsi: "",
            harga: 0
          }
        ]
      }
    ]
  }


  constructor(private transaksiService: TransaksiService, private modalService: NgbModal, private supplierService: SupplierService) {
    this.transaksi = new TransaksiModel();
    this.barang = [new BarangModel()]
    this.supplier = [new SupplierModel()]
    this.transaction = [new TransaksiModel()]
  }

  ngOnInit(): void {
    this.getSupplier()
    this.getTransaction()
  }

  getSupplier() {
    this.supplierService.all().pipe(catchError(this.handleError)).subscribe((resp: any) => {
      this.supplier = resp;
    });
  }

  getTransaction() {
    this.transaksiService.all().pipe(catchError(this.handleError)).subscribe((resp: any) => {
      this.transaction = resp;
      console.log(resp)
    });
  }

  getBarang(id: any) {
    this.penampung = id;
    this.supplierService.all().pipe(catchError(this.handleError)).subscribe((resp: any) => {
      this.supplier = resp;
      this.namaSupplier = resp[id].nama
      this.penampungSupplier = resp[id]._id
      console.log(this.penampungSupplier)
      this.barang = this.supplier[id].listBarang || [];
    });
  }

  onCreate() {
    this.supplierService.all().pipe(catchError(this.handleError)).subscribe((resp: any) => {
      console.log(resp[this.penampungSupplier]);
      

    })
    this.addTransaction = {
      tanggal: this.transaksi.tanggal,
      grandTotal: this.transaksi.grandTotal,
      supplier: [
        {
          _id: "",
          alamat: this.supplier[this.penampung].alamat,
          nama: this.supplier[this.penampung].nama,
          listBarang: [
            {
              namaBarang: this.barang[this.penampung].namaBarang,
              deskripsi: this.barang[this.penampung].deskripsi,
              harga: this.barang[this.penampung].harga
            }
          ]
        }
      ]
    }
    this.transaksiService?.create(this.addTransaction).subscribe((resp: ITransaksi) => {
      console.log(resp)
    });
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

  // MODAL
  closeResult = '';
  openAdd(get: any) {
    this.modalService.open(get, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
