"use client"

import { useState } from "react"
import { Search, Users, Clock, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OfferSeatModal } from "@/components/offer-seat-modal"
import { RequestSeatModal } from "@/components/request-seat-modal"
import { useAuth } from "@/hooks/use-auth"
import { UserNav } from "@/components/user-nav"
import { useRouter } from "next/navigation"

interface Course {
  crn: string
  title: string
  offered: number
  waiting: number
  trend: "up" | "down"
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const { authenticated, loading } = useAuth()
  const router = useRouter()

  // Mock data - in real app, this would come from API
  const stats = {
    seatsOffered: 87,
    studentsWaiting: 243,
    successfulMatches: 156,
    avgMatchTime: 23,
  }

  const popularCourses: Course[] = [
    { crn: "12345", title: "CS 2110 - Computer Organization", offered: 5, waiting: 23, trend: "up" },
    { crn: "12346", title: "MATH 2210 - Linear Algebra", offered: 3, waiting: 18, trend: "up" },
    { crn: "12347", title: "PHYS 2212 - Physics II", offered: 2, waiting: 15, trend: "down" },
    { crn: "12348", title: "CHEM 1310 - General Chemistry", offered: 4, waiting: 12, trend: "up" },
  ]

  const handleOfferSeat = (course: Course) => {
    setSelectedCourse(course)
    setShowOfferModal(true)
  }

  const handleRequestSeat = (course: Course) => {
    setSelectedCourse(course)
    setShowRequestModal(true)
  }

  const handleLogin = () => {
    router.push("/auth/login")
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Loading...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show login prompt if not authenticated
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Smart Course-Seat Exchange</CardTitle>
            <CardDescription>Trade or release available seats in high-demand courses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" size="lg" onClick={handleLogin}>
              Sign in to Continue
            </Button>
            <div className="text-center text-sm text-gray-600">
              <p>Demo accounts available:</p>
              <div className="mt-2 space-y-1 text-xs">
                <p>
                  <strong>Student:</strong> student@university.edu
                </p>
                <p>
                  <strong>Professor:</strong> prof.smith@university.edu
                </p>
                <p>
                  <strong>Admin:</strong> admin@university.edu
                </p>
                <p className="text-gray-500">Password: admin123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Smart Course-Seat Exchange</h1>
            <p className="text-lg text-gray-600">Find the courses you need, offer the seats you don&apos;t</p>
          </div>
          <UserNav />
        </div>

        {/* Search Bar */}
        <div className="text-center mb-8">
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search by CRN or course title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Seats Offered</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.seatsOffered}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Students Waiting</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.studentsWaiting}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Successful Matches</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.successfulMatches}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Match Time</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.avgMatchTime}m</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Popular Courses */}
        <Card>
          <CardHeader>
            <CardTitle>High-Demand Courses</CardTitle>
            <CardDescription>Courses with the most seat exchange activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularCourses.map((course) => (
                <div
                  key={course.crn}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{course.title}</h3>
                      <Badge variant="outline">CRN: {course.crn}</Badge>
                      {course.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
                      )}
                    </div>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>{course.offered} seats offered</span>
                      <span>{course.waiting} students waiting</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleOfferSeat(course)}>
                      Offer Seat
                    </Button>
                    <Button size="sm" onClick={() => handleRequestSeat(course)}>
                      Join Queue
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Modals */}
        <OfferSeatModal open={showOfferModal} onOpenChange={setShowOfferModal} course={selectedCourse} />
        <RequestSeatModal open={showRequestModal} onOpenChange={setShowRequestModal} course={selectedCourse} />
      </div>
    </div>
  )
}
