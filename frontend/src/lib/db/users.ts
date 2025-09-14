import { eq } from 'drizzle-orm';
import { db } from './config';
import { users, type User, type NewUser } from './schema';
import bcrypt from 'bcryptjs';

export class UserService {
  // Create a new user
  static async createUser(userData: Omit<NewUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    
    const newUser = {
      ...userData,
      password: hashedPassword,
    };

    const [user] = await db.insert(users).values(newUser).returning();
    return user;
  }

  // Find user by email
  static async findByEmail(email: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return user || null;
  }

  // Find user by ID
  static async findById(id: number): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user || null;
  }

  // Verify password
  static async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Update user
  static async updateUser(id: number, userData: Partial<Omit<NewUser, 'id' | 'createdAt'>>): Promise<User | null> {
    const updateData = {
      ...userData,
      updatedAt: new Date(),
    };

    // Hash password if it's being updated
    if (userData.password) {
      updateData.password = await bcrypt.hash(userData.password, 12);
    }

    const [user] = await db.update(users).set(updateData).where(eq(users.id, id)).returning();
    return user || null;
  }

  // Check if email exists
  static async emailExists(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    return user !== null;
  }
}
