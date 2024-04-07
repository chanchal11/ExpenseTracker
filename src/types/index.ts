export interface Expense {
    id?: number;
    description: string;
    amount: number;
    medium: string;
    date: number;
}

export interface ExpenseWithId {
    id: number;
    description: string;
    amount: number;
    medium: string;
    date: number;
}

export interface Medium {
    id?: number;
    medium: string;
}