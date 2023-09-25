import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransaksiComponent } from './pages/transaksi/transaksi.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SupplierComponent } from './pages/supplier/supplier.component';

@NgModule({
  declarations: [
    AppComponent,
    TransaksiComponent,
    SupplierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
