"use client"

import { Button, Input, Textarea, Label } from "@medusajs/ui"
import { useRouter } from "next/navigation"
import { useState } from "react"
import type { submitCarReview } from "@lib/data/cars"

type CarReviewFormProps = {
  productId: string
  submitReview: typeof submitCarReview
  onSubmitted?: () => void
}

export default function CarReviewForm({ productId, submitReview, onSubmitted }: CarReviewFormProps) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [rating, setRating] = useState(5)
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const result = await submitReview(productId, {
        reviewer_name: name || undefined,
        rating,
        review_text: text || undefined,
      })
      if (!result.success) {
        throw new Error(result.error)
      }
      setSuccess(true)
      setName("")
      setRating(5)
      setText("")
      onSubmitted?.()
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <p className="text-green-600 text-sm font-medium">
        Thank you! Your review has been submitted.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="reviewer_name">Your name (optional)</Label>
        <Input
          id="reviewer_name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="rating">Rating (1–5)</Label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="mt-1 w-full rounded-md border border-ui-border-base bg-ui-bg-field px-3 py-2 text-ui-fg-base"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} star{n > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="review_text">Review (optional)</Label>
        <Textarea
          id="review_text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your experience..."
          rows={3}
          className="mt-1"
        />
      </div>
      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}
      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit review"}
      </Button>
    </form>
  )
}
