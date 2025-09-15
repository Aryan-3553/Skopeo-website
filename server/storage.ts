import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { 
  type User, 
  type InsertUser, 
  type ContactMessage, 
  type InsertContactMessage,
  users,
  contactMessages
} from "@shared/schema";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  getContactMessage(id: string): Promise<ContactMessage | undefined>;
  updateContactMessageStatus(id: string, status: string): Promise<ContactMessage | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = crypto.randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = crypto.randomUUID();
    const now = new Date();
    const contactMessage: ContactMessage = {
      ...message,
      id,
      status: "new",
      createdAt: now,
      updatedAt: now,
    };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getContactMessage(id: string): Promise<ContactMessage | undefined> {
    return this.contactMessages.get(id);
  }

  async updateContactMessageStatus(id: string, status: string): Promise<ContactMessage | undefined> {
    const message = this.contactMessages.get(id);
    if (message) {
      const updatedMessage = { ...message, status, updatedAt: new Date() };
      this.contactMessages.set(id, updatedMessage);
      return updatedMessage;
    }
    return undefined;
  }
}

export class PostgresStorage implements IStorage {
  private db: ReturnType<typeof drizzle>;

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is required");
    }
    
    const client = postgres(process.env.DATABASE_URL);
    this.db = drizzle(client);
  }

  async getUser(id: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const result = await this.db.insert(contactMessages).values(message).returning();
    return result[0];
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return await this.db.select().from(contactMessages).orderBy(contactMessages.createdAt);
  }

  async getContactMessage(id: string): Promise<ContactMessage | undefined> {
    const result = await this.db.select().from(contactMessages).where(eq(contactMessages.id, id)).limit(1);
    return result[0];
  }

  async updateContactMessageStatus(id: string, status: string): Promise<ContactMessage | undefined> {
    const result = await this.db
      .update(contactMessages)
      .set({ status, updatedAt: new Date() })
      .where(eq(contactMessages.id, id))
      .returning();
    return result[0];
  }
}

// Use PostgreSQL storage if DATABASE_URL is available, otherwise fall back to in-memory
export const storage = process.env.DATABASE_URL 
  ? new PostgresStorage() 
  : new MemStorage();
