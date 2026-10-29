import { memoryDb } from "@/db";
import { hashPassword } from "@/lib/auth";

export interface UserRecord {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  phone: string | null;
  role: "CUSTOMER" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
}

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const user = memoryDb.users.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase()
  );
  return user || null;
}

export async function findUserById(id: string): Promise<UserRecord | null> {
  const user = memoryDb.users.find((u) => u.id === id);
  return user || null;
}

export async function registerCustomer(params: {
  email: string;
  password: string;
  name: string;
  phone?: string;
}): Promise<UserRecord> {
  const existing = await findUserByEmail(params.email);
  if (existing) {
    throw new Error("An account with this email already exists");
  }

  const passwordHash = await hashPassword(params.password);
  const newUser: UserRecord = {
    id: `usr-${Date.now()}`,
    email: params.email.trim().toLowerCase(),
    passwordHash,
    name: params.name.trim(),
    phone: params.phone || null,
    role: "CUSTOMER",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  memoryDb.users.push(newUser);
  return newUser;
}

export async function getAllCustomersAdmin(): Promise<
  Omit<UserRecord, "passwordHash">[]
> {
  return memoryDb.users.map(({ passwordHash: _, ...rest }) => rest);
}
