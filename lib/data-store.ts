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

// In-memory storage
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
export function initializeDemoData() {
  // Only initialize if no users exist
  if (users.length === 0) {
    // Create demo admin user
    userStore.create({
      email: "admin@university.edu",
      password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm", // password: "admin123"
      name: "System Administrator",
      studentId: "ADMIN001",
      hashedStudentId: "admin_hash_001",
      role: "admin",
      department: "IT Services",
    })

    // Create demo professor
    userStore.create({
      email: "prof.smith@university.edu",
      password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm", // password: "admin123"
      name: "Dr. John Smith",
      studentId: "PROF001",
      hashedStudentId: "prof_hash_001",
      role: "professor",
      department: "Computer Science",
    })

    // Create demo student
    userStore.create({
      email: "student@university.edu",
      password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm", // password: "admin123"
      name: "Jane Doe",
      studentId: "STU001",
      hashedStudentId: "student_hash_001",
      role: "student",
      department: undefined,
    })
  }
}
