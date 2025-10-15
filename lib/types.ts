export interface Course {
  crn: string;
  title: string;
  offered?: number;
  waiting?: number;
  trend?: 'up' | 'down' | 'stable';
  pressure?: 'high' | 'medium' | 'low';
  enrolled?: number;
  capacity?: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  studentId?: string;
  hashedStudentId?: string;
  role: 'student' | 'professor' | 'admin';
  department?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface SignupResponse {
  message: string;
  user: User;
}

export interface MeResponse {
  user: User;
}

export interface Stats {
  seatsOffered: number;
  studentsWaiting: number;
  successfulMatches: number;
  avgMatchTime: number;
  activeUsers?: number;
  totalOffers?: number;
  totalRequests?: number;
  flaggedAccounts?: number;
}

export interface FlaggedAccount {
  id: string;
  reason: string;
  timestamp: string;
  status: 'pending' | 'reviewing' | 'resolved';
}

export interface RecentActivity {
  type: 'match' | 'offer' | 'flag';
  message: string;
  timestamp: string;
}