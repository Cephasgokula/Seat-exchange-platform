import { type NextRequest, NextResponse } from "next/server"
import { userStore, initializeDemoData } from "@/lib/data-store"
import bcrypt from "bcryptjs"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    // Initialize demo data
    await initializeDemoData()
    
    // Get all users
    const users = userStore.getAll()
    
    // Test password for the first user
    let passwordTest = null
    if (users.length > 0) {
      const testUser = users.find(u => u.email === "admin@university.edu")
      if (testUser) {
        passwordTest = {
          hasPassword: !!testUser.password,
          passwordLength: testUser.password?.length || 0,
          testCompare: await bcrypt.compare("admin123", testUser.password || "")
        }
      }
    }
    
    return NextResponse.json({
      usersCount: users.length,
      users: users.map(u => ({
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        hasPassword: !!u.password,
        passwordLength: u.password?.length || 0
      })),
      passwordTest
    })
  } catch (error) {
    console.error("Debug error:", error)
    return NextResponse.json({ 
      error: "Internal server error", 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 })
  }
}