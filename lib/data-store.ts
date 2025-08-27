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
      password: "$2b$12$4FNdV5CEC3U6k4IY1/34iemnYHXih8h5ANL5Y42VKeKJO82obSg9m", // password: "admin123"
      name: "System Administrator",
      studentId: "ADMIN001",
      hashedStudentId: "admin_hash_001",
      role: "admin",
      department: "IT Services",
    })

    // Create demo professors
    userStore.create({
      email: "prof.smith@university.edu",
      password: "$2b$12$R5nDr/Ax3Qd2H65wjp1hOuWVGLCV910bgCXi0AECkhwPTgTucZzIi", // password: "prof123"
      name: "Dr. John Smith",
      studentId: "PROF001",
      hashedStudentId: "prof_hash_001",
      role: "professor",
      department: "Computer Science",
    })

    userStore.create({
      email: "prof.johnson@university.edu",
      password: "$2b$12$R5nDr/Ax3Qd2H65wjp1hOuWVGLCV910bgCXi0AECkhwPTgTucZzIi", // password: "prof123"
      name: "Dr. Sarah Johnson",
      studentId: "PROF002",
      hashedStudentId: "prof_hash_002",
      role: "professor",
      department: "Mathematics",
    })

    userStore.create({
      email: "prof.wilson@university.edu",
      password: "$2b$12$R5nDr/Ax3Qd2H65wjp1hOuWVGLCV910bgCXi0AECkhwPTgTucZzIi", // password: "prof123"
      name: "Dr. Robert Wilson",
      studentId: "PROF003",
      hashedStudentId: "prof_hash_003",
      role: "professor",
      department: "Physics",
    })

    userStore.create({
      email: "prof.davis@university.edu",
      password: "$2b$12$R5nDr/Ax3Qd2H65wjp1hOuWVGLCV910bgCXi0AECkhwPTgTucZzIi", // password: "prof123"
      name: "Dr. Emily Davis",
      studentId: "PROF004",
      hashedStudentId: "prof_hash_004",
      role: "professor",
      department: "Chemistry",
    })

    userStore.create({
      email: "prof.brown@university.edu",
      password: "$2b$12$R5nDr/Ax3Qd2H65wjp1hOuWVGLCV910bgCXi0AECkhwPTgTucZzIi", // password: "prof123"
      name: "Dr. Michael Brown",
      studentId: "PROF005",
      hashedStudentId: "prof_hash_005",
      role: "professor",
      department: "Biology",
    })

    // Create demo students with password123
    const studentNames = [
      "Jane Doe", "John Smith", "Emily Johnson", "Michael Wilson", "Sarah Davis",
      "Robert Brown", "Lisa Miller", "David Garcia", "Jennifer Martinez", "Christopher Anderson",
      "Amanda Taylor", "Joshua Thomas", "Ashley Jackson", "Andrew White", "Jessica Harris",
      "Daniel Martin", "Stephanie Thompson", "Matthew Garcia", "Michelle Rodriguez", "Anthony Lewis",
      "Nicole Lee", "Ryan Walker", "Heather Hall", "Justin Allen", "Samantha Young",
      "Brandon King", "Rachel Wright", "Tyler Lopez", "Megan Hill", "Kevin Scott",
      "Lauren Green", "Zachary Adams", "Brittany Baker", "Nathan Gonzalez", "Courtney Nelson",
      "Jonathan Carter", "Danielle Mitchell", "Jacob Perez", "Alexis Roberts", "Nicholas Turner",
      "Kayla Phillips", "Austin Campbell", "Taylor Parker", "Jordan Evans", "Morgan Edwards",
      "Noah Collins", "Sydney Stewart", "Connor Sanchez", "Brooke Morris", "Logan Rogers"
    ]

    const departments = [
      "Computer Science", "Mathematics", "Physics", "Chemistry", "Biology",
      "Engineering", "Business", "Psychology", "English", "History",
      "Art", "Music", "Political Science", "Economics", "Sociology"
    ]

    studentNames.forEach((name, index) => {
      const studentNumber = String(index + 1).padStart(3, '0')
      userStore.create({
        email: `student${studentNumber}@university.edu`,
        password: "$2b$12$XhbIgFoMc3TRgcLe2rO0AepVIpiXpOQH7lMrFK3zvF7rzrJ4ZiRC.", // password: "password123"
        name: name,
        studentId: `STU${studentNumber}`,
        hashedStudentId: `student_hash_${studentNumber}`,
        role: "student",
        department: departments[index % departments.length],
      })
    })

    // Create additional admin users
    userStore.create({
      email: "admin.tech@university.edu",
      password: "$2b$12$4FNdV5CEC3U6k4IY1/34iemnYHXih8h5ANL5Y42VKeKJO82obSg9m", // password: "admin123"
      name: "Technical Administrator",
      studentId: "ADMIN002",
      hashedStudentId: "admin_hash_002",
      role: "admin",
      department: "IT Services",
    })

    userStore.create({
      email: "admin.academic@university.edu",
      password: "$2b$12$4FNdV5CEC3U6k4IY1/34iemnYHXih8h5ANL5Y42VKeKJO82obSg9m", // password: "admin123"
      name: "Academic Administrator",
      studentId: "ADMIN003",
      hashedStudentId: "admin_hash_003",
      role: "admin",
      department: "Academic Affairs",
    })

    console.log(`Initialized demo data with ${users.length} users`)
  }
}
