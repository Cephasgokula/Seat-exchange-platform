// In-memory data store for demo purposes
// In production, this would be replaced with a real database

export interface User {
  id: string
  email: string
  password: string
  name: string
  studentId: string
  hashedStudentId: string
  role: "student" | "professor" | "admin"
  department?: string
  createdAt: Date
}

export interface AuthLog {
  id: string
  hashedUserId: string
  action: string
  success: boolean
  ipAddress?: string
  userAgent?: string
  createdAt: Date
}

export interface SeatOffer {
  id: string
  hashedStudentId: string
  crn: string
  reason?: string
  status: "OPEN" | "LOCKED" | "COMPLETED" | "EXPIRED"
  createdAt: Date
  expiresAt: Date
  completedAt?: Date
}

export interface SeatRequest {
  id: string
  hashedStudentId: string
  crn: string
  queueScore: number
  status: "QUEUED" | "LOCKED" | "COMPLETED" | "CANCELLED"
  createdAt: Date
  completedAt?: Date
}

export interface Match {
  id: string
  offerId: string
  requestId: string
  lockedUntil: Date
  completedAt?: Date
  createdAt: Date
}

// In-memory storage with a flag to track initialization
let isInitialized = false
const users: User[] = []
const authLogs: AuthLog[] = []
const seatOffers: SeatOffer[] = []
const seatRequests: SeatRequest[] = []
const matches: Match[] = []

// Helper function to generate IDs
function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// User operations
export const userStore = {
  create: (userData: Omit<User, "id" | "createdAt">): User => {
    const user: User = {
      ...userData,
      id: generateId(),
      createdAt: new Date(),
    }
    users.push(user)
    return user
  },

  findByEmail: (email: string): User | null => {
    return users.find((user) => user.email === email) || null
  },

  findByStudentId: (studentId: string): User | null => {
    return users.find((user) => user.studentId === studentId) || null
  },

  findById: (id: string): User | null => {
    return users.find((user) => user.id === id) || null
  },

  findByEmailOrStudentId: (email: string, studentId: string): User | null => {
    return users.find((user) => user.email === email || user.studentId === studentId) || null
  },

  getAll: (): User[] => {
    return [...users]
  },
}

// Auth log operations
export const authLogStore = {
  create: (logData: Omit<AuthLog, "id" | "createdAt">): AuthLog => {
    const log: AuthLog = {
      ...logData,
      id: generateId(),
      createdAt: new Date(),
    }
    authLogs.push(log)
    return log
  },

  getAll: (): AuthLog[] => {
    return [...authLogs]
  },

  getByUserId: (hashedUserId: string): AuthLog[] => {
    return authLogs.filter((log) => log.hashedUserId === hashedUserId)
  },
}

// Seat offer operations
export const seatOfferStore = {
  create: (offerData: Omit<SeatOffer, "id" | "createdAt">): SeatOffer => {
    const offer: SeatOffer = {
      ...offerData,
      id: generateId(),
      createdAt: new Date(),
    }
    seatOffers.push(offer)
    return offer
  },

  findById: (id: string): SeatOffer | null => {
    return seatOffers.find((offer) => offer.id === id) || null
  },

  findByCrn: (crn: string): SeatOffer[] => {
    return seatOffers.filter((offer) => offer.crn === crn)
  },

  getAll: (): SeatOffer[] => {
    return [...seatOffers]
  },
}

// Seat request operations
export const seatRequestStore = {
  create: (requestData: Omit<SeatRequest, "id" | "createdAt">): SeatRequest => {
    const request: SeatRequest = {
      ...requestData,
      id: generateId(),
      createdAt: new Date(),
    }
    seatRequests.push(request)
    return request
  },

  findById: (id: string): SeatRequest | null => {
    return seatRequests.find((request) => request.id === id) || null
  },

  findByCrn: (crn: string): SeatRequest[] => {
    return seatRequests.filter((request) => request.crn === crn)
  },

  getAll: (): SeatRequest[] => {
    return [...seatRequests]
  },
}

// Match operations
export const matchStore = {
  create: (matchData: Omit<Match, "id" | "createdAt">): Match => {
    const match: Match = {
      ...matchData,
      id: generateId(),
      createdAt: new Date(),
    }
    matches.push(match)
    return match
  },

  findById: (id: string): Match | null => {
    return matches.find((match) => match.id === id) || null
  },

  getAll: (): Match[] => {
    return [...matches]
  },
}

// Initialize with some demo data
export async function initializeDemoData() {
  // Only initialize once per process lifecycle with fixed IDs
  if (users.length === 0 && !isInitialized) {
    isInitialized = true
    const bcrypt = require('bcryptjs')
    
    // Create demo admin user with fixed ID
    users.push({
      id: "fixed-admin-id",
      email: "admin@university.edu",
      password: await bcrypt.hash("admin123", 12),
      name: "System Administrator",
      studentId: "ADMIN001",
      hashedStudentId: "admin_hash_001",
      role: "admin",
      department: "IT Services",
      createdAt: new Date(),
    })

    // Create demo professor with fixed ID
    users.push({
      id: "fixed-prof-id",
      email: "prof.smith@university.edu",
      password: await bcrypt.hash("admin123", 12),
      name: "Dr. John Smith",
      studentId: "PROF001",
      hashedStudentId: "prof_hash_001",
      role: "professor",
      department: "Computer Science",
      createdAt: new Date(),
    })

    // Create demo student with fixed ID
    users.push({
      id: "fixed-student-id",
      email: "student@university.edu",
      password: await bcrypt.hash("admin123", 12),
      name: "Jane Doe",
      studentId: "STU001",
      hashedStudentId: "student_hash_001",
      role: "student",
      department: undefined,
      createdAt: new Date(),
    })
  }
}
