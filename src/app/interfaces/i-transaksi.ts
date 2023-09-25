import { ISupplier } from "./i-supplier"

export interface ITransaksi {
    _id?: String,
    tanggal: Date,
    grandTotal: Number,
    supplier?: Array<ISupplier>
}
