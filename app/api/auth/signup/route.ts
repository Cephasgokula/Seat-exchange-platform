import { type NextRequest, NextResponse } from "next/server"
import { createUser } from "@/lib/auth-server"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, studentId, role, department } = await request.json()

    if (!email || !password || !name || !studentId) {
      return NextResponse.json({ error: "All required fields must be provided" }, { status: 400 })
    }

    // Check if user already exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email }
    })
    
    const existingUserByStudentId = await prisma.user.findUnique({
      where: { studentId }
    })

    if (existingUserByEmail) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
    }
    
    if (existingUserByStudentId) {
      return NextResponse.json({ error: "Student ID already registered" }, { status: 409 })
    }

    // Validate email format (basic validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 })
    }

    // Validate role
    if (!["student", "professor"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 })
    }

    const user = await createUser({
      email,
      password,
      name,
      studentId,
      role,
      department,
    })

    return NextResponse.json({
      message: "User created successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        studentId: user.studentId,
        role: user.role,
        department: user.department,
      },
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
