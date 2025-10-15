import bcrypt from "bcryptjs"
import { SignJWT, jwtVerify } from "jose"
import { prisma } from "@/lib/prisma"

type User = {
  id: string
  email: string
  password: string
  name: string
  studentId: string
  hashedStudentId: string
  role: string
  department?: string | null
  createdAt: Date
  updatedAt: Date
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

// Hash student ID for FERPA compliance
export function hashStudentId(studentId: string): string {
  const salt = process.env.STUDENT_ID_SALT || "default-salt"
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

  // Convert role string to Prisma enum
  let roleEnum = "STUDENT"
  if (data.role === "professor") roleEnum = "PROFESSOR"
  if (data.role === "admin") roleEnum = "ADMIN"

  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
      studentId: data.studentId,
      hashedStudentId,
      role: roleEnum as any,
      department: data.department,
    },
  })

  // Log user creation
  await prisma.authLog.create({
    data: {
      userId: user.id,
      hashedUserId: hashedStudentId,
      action: "user_created",
      success: true,
    },
  })

  return user
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  console.log('🔍 Attempting login for:', email)
  
  const user = await prisma.user.findUnique({
    where: { email }
  })
  
  console.log('🔍 User found:', !!user, user ? { id: user.id, email: user.email, hasPassword: !!user.password } : 'null')

  if (!user || !user.password) {
    console.log('❌ User not found or no password')
    // Log failed attempt
    await prisma.authLog.create({
      data: {
        hashedUserId: email, // Use email for failed attempts
        action: "login_failed",
        success: false,
      },
    })
    return null
  }

  console.log('🔍 Verifying password...')
  const isValid = await verifyPassword(password, user.password)
  console.log('🔍 Password valid:', isValid)

  if (!isValid) {
    console.log('❌ Invalid password')
    // Log failed attempt
    await prisma.authLog.create({
      data: {
        userId: user.id,
        hashedUserId: user.hashedStudentId,
        action: "login_failed",
        success: false,
      },
    })
    return null
  }

  console.log('✅ Login successful')
  // Log successful login
  await prisma.authLog.create({
    data: {
      userId: user.id,
      hashedUserId: user.hashedStudentId,
      action: "login_success",
      success: true,
    },
  })

  return user
}

export async function getUserById(id: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { id }
  })
}

// Initialize demo data
export async function initializeDemoData() {
  console.log('🔍 Checking for demo data...')
  
  const userCount = await prisma.user.count()
  console.log('🔍 Current user count:', userCount)
  
  if (userCount === 0) {
    console.log('✅ Creating demo users...')
    
    // Create demo admin user
    await prisma.user.create({
      data: {
        email: "admin@university.edu",
        password: await hashPassword("admin123"),
        name: "System Administrator",
        studentId: "ADMIN001",
        hashedStudentId: hashStudentId("ADMIN001"),
        role: "ADMIN",
        department: "IT Services",
      },
    })

    // Create demo professor
    await prisma.user.create({
      data: {
        email: "prof.smith@university.edu",
        password: await hashPassword("admin123"),
        name: "Dr. John Smith",
        studentId: "PROF001",
        hashedStudentId: hashStudentId("PROF001"),
        role: "PROFESSOR",
        department: "Computer Science",
      },
    })

    // Create demo student
    await prisma.user.create({
      data: {
        email: "student@university.edu",
        password: await hashPassword("admin123"),
        name: "Jane Doe",
        studentId: "STU001",
        hashedStudentId: hashStudentId("STU001"),
        role: "STUDENT",
      },
    })

    console.log('✅ Demo data created successfully')
  } else {
    console.log('ℹ️ Demo data already exists')
  }
}
