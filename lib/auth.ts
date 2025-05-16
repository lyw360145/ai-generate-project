import { MongoClient,ObjectId } from 'mongodb';
// import {  } from 'mongodb';
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

   
  static async authenticate(username: string, password: string): Promise<string> {
    const db = await this.connect();
    const users = db.collection('users');
    const user = await users.findOne({ username });
    if (!user) {
      throw new Error('用户不存在');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('密码错误');
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

    
    return token;
  }
  static async verifyToken(token: string): Promise<any> {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || 'secret');
    } catch (error) {
      throw new Error('Token验证失败');
    }
  }

  static async getUserById(userId: string): Promise<any> {
    const db = await this.connect();
    const users = db.collection('users');
    
    const user = await users.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      throw new Error('用户不存在');
    }
    return user;
  }

 
}


export default Auth;