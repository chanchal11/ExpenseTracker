// sqliteService.ts
import SQLite from 'react-native-sqlite-storage';
import { Expense, Medium } from '../types';

const DB_NAME = 'expenseTracker.db';

// Open SQLite database connection
const db = SQLite.openDatabase({ name: DB_NAME, location: 'default' }, () => console.log('Database connection established'), (error) => console.error('Error connecting to database:', error));

// Create expenses table if not exists
db.transaction((tx) => {
    tx.executeSql(
        `
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT,
      amount REAL,
      medium TEXT,
      date INTEGER
    )
    `,
        [],
        () => console.log('Expenses table created successfully'),
        (_, error) => console.error('Error creating expenses table:', error)
    );

    // create mediums table if not exists
    tx.executeSql(
        `
    CREATE TABLE IF NOT EXISTS mediums (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      medium TEXT
    )
    `,
        [],
        () => console.log('Medium table created successfully'),
        (_, error) => console.error('Error creating medium table:', error));

});

// Function to load initial expenses from SQLite
export const loadInitialExpensesFromSQLite = async (): Promise<Expense[]> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM expenses',
                [],
                (_, { rows }) => {
                    const expenses: Expense[] = [];
                    for (let i = 0; i < rows.length; i++) {
                        const { id, description, amount, medium, date } = rows.item(i);
                        expenses.push({ id, description, amount, medium, date });
                    }
                    resolve(expenses);
                },
                (_, error) => {
                    console.error('Error loading expenses from SQLite:', error);
                    reject(error);
                }
            );
        });
    });
};

// Function to load initial mediums from SQLite
export const loadInitialMediumFromSQLite = async (): Promise<Medium[]> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM mediums',
                [],
                (_, { rows }) => {
                    const mediums: Medium[] = [];
                    for (let i = 0; i < rows.length; i++) {
                        const { id, medium } = rows.item(i);
                        mediums.push({ id, medium });
                    }
                    resolve(mediums);
                },
                (_, error) => {
                    console.error('Error loading mediums from SQLite:', error);
                    reject(error);
                }
            );
        });
    });
};

// Function to save expense to SQLite
export const saveExpenseToSQLite = async (expense: Expense): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO expenses (description, amount, medium, date) VALUES (?, ?, ?, ?)',
                [expense.description, expense.amount, expense.medium, expense.date],
                () => {
                    console.log('Expense saved to SQLite successfully');
                    resolve();
                },
                (_, error) => {
                    console.error('Error saving expense to SQLite:', error);
                    reject(error);
                }
            );
        });
    });
};

// Function to save medium to SQLite
export const saveMediumToSQLite = async (medium: Medium): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO mediums (medium) VALUES (?)',
                [medium.medium],
                () => {
                    console.log('Medium saved to SQLite successfully');
                    resolve();
                },
                (_, error) => {
                    console.error('Error saving medium to SQLite:', error);
                    reject(error);
                }
            );
        });
    });
};