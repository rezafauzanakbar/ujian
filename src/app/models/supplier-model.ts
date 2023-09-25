import { IBarang } from "../interfaces/i-barang";
import { ISupplier } from "../interfaces/i-supplier";
import { BarangModel } from "./barang-model";

export class SupplierModel implements ISupplier {
    _id: String = "";
    alamat: String = "";
    nama: String = "";
    listBarang?: Array<IBarang> = [];
}
