import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'auth';

class Auth {
  static async connect() {
    await client.connect();
    return client.db(dbName);
  }



  static async checkUserExists(username: string): Promise<boolean> {
    const db = await this.connect();
    const users = db.collection('users');
    const existingUser = await users.findOne({ username });
    return !!existingUser;
  }

  static async createUser(username: string, password: string): Promise<void> {
    const db = await this.connect();
    const users = db.collection('users');

    const existingUser = await users.findOne({ username });
    if (existingUser) {
      throw new Error('用户名已存在');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await users.insertOne({ username, password: hashedPassword });
  }


}

export default Auth;