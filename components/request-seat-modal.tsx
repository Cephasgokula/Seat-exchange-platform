"use client"

import { useState } from "react"
import { Users, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Course {
  crn: string
  title: string
  offered: number
  waiting: number
  trend: "up" | "down" | "neutral"
}

interface RequestSeatModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  course: Course | null
}

export function RequestSeatModal({ open, onOpenChange, course }: RequestSeatModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [queuePosition, setQueuePosition] = useState<number | null>(null)

  if (!course) return null

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock response from POST /v1/seats/request
    const mockResponse = {
      queue_position: Math.floor(Math.random() * 20) + 1,
      est_wait_min: Math.floor(Math.random() * 120) + 30,
    }

    setQueuePosition(mockResponse.queue_position)
    setIsSubmitting(false)
  }

  if (!course) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Join Queue</DialogTitle>
          <DialogDescription>
            Request a seat in <strong>{course.title}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline">CRN: {course.crn}</Badge>
            <Badge variant="destructive">Not Enrolled</Badge>
          </div>

          {!queuePosition ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-1">
                    <Users className="h-4 w-4" />
                    <span>In Queue</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{course.waiting}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-1">
                    <Clock className="h-4 w-4" />
                    <span>Avg Wait</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">23m</div>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  You can be in up to 3 concurrent queues. When matched, you&apos;ll have 15 minutes to register for the
                  course after the current student drops.
                </AlertDescription>
              </Alert>

              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-sm text-green-800">
                  <strong>Prerequisites:</strong> Verified ✓
                </div>
              </div>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="text-green-600">
                <Users className="h-12 w-12 mx-auto mb-2" />
                <h3 className="text-lg font-semibold">You&apos;re in the queue!</h3>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Queue Position</span>
                  <span className="font-semibold">#{queuePosition}</span>
                </div>
                <Progress value={((20 - queuePosition) / 20) * 100} className="h-2" />
                <div className="text-xs text-gray-500">Estimated wait: 30-45 minutes</div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  We&apos;ll notify you immediately when a seat becomes available. Keep your notifications enabled!
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>

        <DialogFooter>
          {!queuePosition ? (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Joining Queue..." : "Join Queue"}
              </Button>
            </>
          ) : (
            <Button onClick={() => onOpenChange(false)} className="w-full">
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
