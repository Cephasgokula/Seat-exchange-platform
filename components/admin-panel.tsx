"use client"

import { useState } from "react"
import { AlertTriangle, Users, Settings, Shield, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AdminPanel() {
  const [fairnessWeight, setFairnessWeight] = useState([0.7])
  const [rateLimits, setRateLimits] = useState({
    offers: 5,
    requests: 10,
  })

  // Mock data for admin monitoring
  const systemStats = {
    activeUsers: 1247,
    totalOffers: 89,
    totalRequests: 267,
    successfulMatches: 156,
    flaggedAccounts: 3,
  }

  const flaggedAccounts = [
    { id: "user123", reason: "3 unmatched drops/day", timestamp: "2025-01-08 14:30", status: "pending" },
    { id: "user456", reason: "Excessive queue joining", timestamp: "2025-01-08 13:15", status: "reviewing" },
    { id: "user789", reason: "Suspicious pattern", timestamp: "2025-01-08 12:00", status: "resolved" },
  ]

  const recentActivity = [
    { type: "match", message: "Successful match for CS 2110", timestamp: "2 minutes ago" },
    { type: "offer", message: "New seat offered in MATH 2210", timestamp: "5 minutes ago" },
    { type: "flag", message: "Account flagged for review", timestamp: "12 minutes ago" },
    { type: "match", message: "Successful match for PHYS 2212", timestamp: "18 minutes ago" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">System Administration</h1>
        <p className="text-gray-600">Monitor and configure the seat exchange platform</p>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{systemStats.activeUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Offers</p>
                <p className="text-2xl font-bold text-gray-900">{systemStats.totalOffers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-gray-900">{systemStats.totalRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Matches</p>
                <p className="text-2xl font-bold text-gray-900">{systemStats.successfulMatches}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Flagged</p>
                <p className="text-2xl font-bold text-gray-900">{systemStats.flaggedAccounts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="settings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="settings">System Settings</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="abuse">Abuse Control</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Fair-Queue Algorithm
              </CardTitle>
              <CardDescription>Configure the fairness weight for queue prioritization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Fairness Weight: {fairnessWeight[0]}</Label>
                <Slider
                  value={fairnessWeight}
                  onValueChange={setFairnessWeight}
                  max={1}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-sm text-gray-600">
                  Higher values prioritize wait time, lower values prioritize credit hour deficit
                </p>
              </div>
              <Button>Update Algorithm</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rate Limits</CardTitle>
              <CardDescription>Configure daily limits for user actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="offers">Seat Offers per Day</Label>
                  <Input
                    id="offers"
                    type="number"
                    value={rateLimits.offers}
                    onChange={(e) => setRateLimits((prev) => ({ ...prev, offers: Number.parseInt(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requests">Queue Joins per Day</Label>
                  <Input
                    id="requests"
                    type="number"
                    value={rateLimits.requests}
                    onChange={(e) => setRateLimits((prev) => ({ ...prev, requests: Number.parseInt(e.target.value) }))}
                  />
                </div>
              </div>
              <Button>Update Limits</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Real-time system activity feed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.type === "match"
                            ? "bg-green-500"
                            : activity.type === "offer"
                              ? "bg-blue-500"
                              : "bg-red-500"
                        }`}
                      />
                      <span className="text-sm">{activity.message}</span>
                    </div>
                    <span className="text-xs text-gray-500">{activity.timestamp}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="abuse" className="space-y-6">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{systemStats.flaggedAccounts} accounts require manual review</AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Flagged Accounts
              </CardTitle>
              <CardDescription>Accounts flagged for suspicious activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {flaggedAccounts.map((account, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{account.id}</span>
                        <Badge
                          variant={
                            account.status === "pending"
                              ? "destructive"
                              : account.status === "reviewing"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {account.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{account.reason}</p>
                      <p className="text-xs text-gray-500">{account.timestamp}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                      <Button variant="destructive" size="sm">
                        Suspend
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
