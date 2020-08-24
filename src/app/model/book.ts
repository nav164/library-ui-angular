export interface Book {
    position?: number;
    isbn?: string;
    name?: string;
    author?: string;
    price?: number;
    isAvailable?: boolean;
    user?: User;
}

export class Borrow {
    userId: number;
    book: Book[];
}

export interface User {
    userId: string;
    name: string;
    age: number;
    isMember: string;
}
