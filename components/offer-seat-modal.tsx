"use client"

import { useState } from "react"
import { AlertTriangle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

interface Course {
  crn: string
  title: string
  offered: number
  waiting: number
  trend: "up" | "down" | "neutral"
}

interface OfferSeatModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  course: Course | null
}

export function OfferSeatModal({ open, onOpenChange, course }: OfferSeatModalProps) {
  const [reason, setReason] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!course) return null

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In real app, make API call to POST /v1/seats/offer
    console.log("Offering seat for course:", course?.crn, "Reason:", reason)

    setIsSubmitting(false)
    onOpenChange(false)
    setReason("")
  }

  if (!course) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Offer Your Seat</DialogTitle>
          <DialogDescription>
            You&apos;re about to offer your seat in <strong>{course.title}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline">CRN: {course.crn}</Badge>
            <Badge variant="secondary">Enrolled</Badge>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> Once matched, you&apos;ll have exactly 15 minutes to drop this course in the SIS.
              Failure to drop will result in the match being cancelled.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Reason for dropping (optional)</Label>
            <RadioGroup value={reason} onValueChange={setReason}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="switch_major" id="switch_major" />
                <Label htmlFor="switch_major" className="text-sm">
                  Switching major
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="time_conflict" id="time_conflict" />
                <Label htmlFor="time_conflict" className="text-sm">
                  Time conflict
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other" className="text-sm">
                  Other
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-blue-800">
              <Clock className="h-4 w-4" />
              <span>Your offer will expire in 24 hours if not matched</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Posting Offer..." : "Offer Seat"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
