import { IBarang } from "./i-barang";

export interface ISupplier {
    _id: String,
    alamat: String,
    nama: String,
    listBarang?: IBarang[]
}
