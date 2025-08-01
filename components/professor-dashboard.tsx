"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, Users, Clock, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ProfessorDashboard() {
  const [selectedCourse, setSelectedCourse] = useState("all")

  // Mock data - in real app, this would come from /courses/{crn}/demand API
  const courses = [
    {
      crn: "12345",
      title: "CS 2110 - Computer Organization",
      enrolled: 45,
      capacity: 50,
      offered: 5,
      waiting: 23,
      trend: "up",
      pressure: "high",
    },
    {
      crn: "12346",
      title: "CS 3410 - Computer System Organization",
      enrolled: 38,
      capacity: 40,
      offered: 2,
      waiting: 15,
      trend: "stable",
      pressure: "medium",
    },
    {
      crn: "12347",
      title: "CS 4410 - Operating Systems",
      enrolled: 32,
      capacity: 35,
      offered: 1,
      waiting: 8,
      trend: "down",
      pressure: "low",
    },
  ]

  const getPressureColor = (pressure: string) => {
    switch (pressure) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-green-500" />
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Demand Analytics</h1>
          <p className="text-gray-600">Monitor seat exchange activity for your courses</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {courses.map((course) => (
                <SelectItem key={course.crn} value={course.crn}>
                  {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Enrolled</p>
                <p className="text-2xl font-bold text-gray-900">115</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Seats Offered</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Students Waiting</p>
                <p className="text-2xl font-bold text-gray-900">46</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Successful Swaps</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Details */}
      <Card>
        <CardHeader>
          <CardTitle>Course Demand Heat Map</CardTitle>
          <CardDescription>Real-time view of seat exchange pressure across your courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.crn} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-900">{course.title}</h3>
                    <Badge variant="outline">CRN: {course.crn}</Badge>
                    <Badge className={getPressureColor(course.pressure)}>{course.pressure} pressure</Badge>
                    {getTrendIcon(course.trend)}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Enrolled:</span>
                    <span className="ml-2 font-semibold">
                      {course.enrolled}/{course.capacity}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Offered:</span>
                    <span className="ml-2 font-semibold text-blue-600">{course.offered}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Waiting:</span>
                    <span className="ml-2 font-semibold text-orange-600">{course.waiting}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Utilization:</span>
                    <span className="ml-2 font-semibold">{Math.round((course.enrolled / course.capacity) * 100)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
