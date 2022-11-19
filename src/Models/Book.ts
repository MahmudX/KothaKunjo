import { IBook } from "../Interfaces/IBook";

class Book implements IBook {
    id: string;
    name: string;
    note: string;
    mrp: number;
    authorNames: string;
    /**
     *
     */
    constructor(id: string, name: string, note: string, mrp: number, authorNames: string) {
        this.id = id;
        this.name = name;
        this.note = note;
        this.mrp = mrp;
        this.authorNames = authorNames;
    }

}

export default Book;