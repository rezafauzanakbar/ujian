import { IBarang } from "../interfaces/i-barang";
import { ISupplier } from "../interfaces/i-supplier";
import { ITransaksi } from "../interfaces/i-transaksi";
import { BarangModel } from "./barang-model";
import { SupplierModel } from "./supplier-model";

export class TransaksiModel implements ITransaksi {
    _id: String = "";
    tanggal: Date = new Date();
    grandTotal: Number = 0;
    supplier?: Array<ISupplier> = [new SupplierModel];
    listBarang?: Array<IBarang> = [new BarangModel];
}
