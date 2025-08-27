import bcrypt from "bcryptjs"
import { SignJWT, jwtVerify } from "jose"
import { userStore, authLogStore, initializeDemoData, type User } from "@/lib/data-store"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

// Initialize demo data
initializeDemoData()

// Hash student ID for FERPA compliance
export function hashStudentId(studentId: string): string {
  const salt = process.env.STUDENT_ID_SALT || "default-salt"
  // Use a simple hash function that works in Edge Runtime
  let hash = 0
  const str = studentId + salt
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36)
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function generateToken(user: User): Promise<string> {
  return await new SignJWT({
    userId: user.id,
    email: user.email,
    role: user.role,
    studentId: user.studentId,
    hashedStudentId: user.hashedStudentId,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string): Promise<{
  userId: string;
  email: string;
  role: string;
  studentId: string;
  hashedStudentId: string;
} | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as {
      userId: string;
      email: string;
      role: string;
      studentId: string;
      hashedStudentId: string;
    }
  } catch {
    return null
  }
}

export async function createUser(data: {
  email: string
  password: string
  name: string
  studentId: string
  role?: "student" | "professor" | "admin"
  department?: string
}): Promise<User> {
  const hashedPassword = await hashPassword(data.password)
  const hashedStudentId = hashStudentId(data.studentId)

  const user = userStore.create({
    email: data.email,
    password: hashedPassword,
    name: data.name,
    studentId: data.studentId,
    hashedStudentId,
    role: data.role || "student",
    department: data.department,
  })

  // Log user creation
  authLogStore.create({
    hashedUserId: hashedStudentId,
    action: "user_created",
    success: true,
  })

  return user
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = userStore.findByEmail(email)

  if (!user || !user.password) {
    // Log failed attempt
    authLogStore.create({
      hashedUserId: email, // Use email for failed attempts
      action: "login_failed",
      success: false,
    })
    return null
  }

  const isValid = await verifyPassword(password, user.password)

  if (!isValid) {
    // Log failed attempt
    authLogStore.create({
      hashedUserId: user.hashedStudentId,
      action: "login_failed",
      success: false,
    })
    return null
  }

  // Log successful login
  authLogStore.create({
    hashedUserId: user.hashedStudentId,
    action: "login_success",
    success: true,
  })

  return user
}

export async function getUserById(id: string): Promise<User | null> {
  return userStore.findById(id)
}
