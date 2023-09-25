import { IBarang } from "../interfaces/i-barang";

export class BarangModel implements IBarang {
    namaBarang: String = "";
    deskripsi: String = "";
    harga: Number = 0;
}
