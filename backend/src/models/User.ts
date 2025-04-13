import knex from "knex";
import * as bcrypt from "bcrypt";
import knexConfig from "../../knexfile";

// SALT_ROUNDS is the number of rounds to use when hashing passwords
const SALT_ROUNDS = 12;

// initialize knex with the configuration
const knexInstance = knex(knexConfig);

export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
  is_verified: boolean;
  verified_at?: Date | null;
  verification_token?: string | null;
}

export const UserModel = {
  async create(userData: {
    email: string;
    name: string;
    password: string;
  }): Promise<User> {
    const { email, name, password } = userData;

    // Check if the email already exists
    const existingUser = await knexInstance<User>("users")
      .where({ email })
      .first();

    if (existingUser) {
      throw new Error("Email already registered");
    }

    // Hash the password
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

    // Insert the new user into the database
    const [user] = await knexInstance<User>("users")
      .insert({
        email,
        name,
        password_hash,
        created_at: new Date(),
        updated_at: new Date(),
        is_verified: false,
        verification_token: generateVerificationToken(),
      })
      .returning("*");

    return user;
  },

  async findByEmail(email: string): Promise<User | undefined> {
    return knexInstance<User>("users").where({ email }).first();
  },
};

function generateVerificationToken(): string {
  return require("crypto").randomBytes(32).toString("hex");
}

async function verifyPassword(
  email: string,
  password: string
): Promise<boolean> {
  const user = await this.findByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
  return bcrypt.compare(password, user.password);
}
