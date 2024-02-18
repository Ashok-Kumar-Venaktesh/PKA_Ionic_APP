import { Injectable, WritableSignal, signal } from '@angular/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';

const DB_USERS = 'myuserdb';

export interface User {
  id: number;
  name: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private users: WritableSignal<User[]> = signal<User[]>([]);

  constructor() {}

  async initializePlugin() {
    this.db = await this.sqlite.createConnection(
      DB_USERS,
      false,
      'no-encryption',
      1,
      false
    );

    await this.db.open();

    const schema = `CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      active BOOLEAN DEFAULT 0
    )`;

    await this.db.execute(schema);

    this.loadUsers();
    return true;
  }

  async loadUsers() {
    const users = await this.db.query('SELECT * FROM users');
    this.users.set(users.values || []);
    console.log(this.users);
  }

  async addUser(name: string) {
    const query = `INSERT INTO users (name) VALUES ('${name}')`;
    const result = await this.db.query(query);

    this.loadUsers();
    return result;
  }

  async updateUserById(id: string, active: boolean) {
    const query = `UPDATE users SET active=${active} WHERE id=${id}`;
    const result = await this.db.query(query);

    this.loadUsers();
    return result;
  }

  async deleteUser(name: string) {
    const query = `INSERT INTO users (name) VALUES ('${name}')`;
    const result = await this.db.query(query);

    this.loadUsers();
    return result;
  }

  getUsers() {
    return this.users;
  }
}
