import { defineWidgetConfig } from "@medusajs/admin-sdk"
import {
  Badge,
  Button,
  Container,
  Heading,
  Input,
  Label,
  Select,
  Table,
  Text,
  Textarea,
} from "@medusajs/ui"
import { useState, useEffect, useCallback } from "react"

type Review = {
  id: string
  reviewer_name: string
  rating: number
  review_text: string
  created_at?: string
}

const CarReviewsWidget = (props: any) => {
  const product = props?.data?.product ?? props?.data
  const productId = product?.id

  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [form, setForm] = useState({ reviewer_name: "", rating: 5, review_text: "" })
  const [editingId, setEditingId] = useState<string | null>(null)

  const loadReviews = useCallback(() => {
    if (!productId) return
    setLoading(true)
    fetch(`/admin/cars/${productId}/reviews`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : { reviews: [] }))
      .then((d) => setReviews(d.reviews ?? []))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false))
  }, [productId])

  useEffect(() => {
    loadReviews()
  }, [loadReviews])

  const startEdit = (r: Review) => {
    setEditingId(r.id)
    setForm({
      reviewer_name: r.reviewer_name ?? "",
      rating: r.rating ?? 5,
      review_text: r.review_text ?? "",
    })
    setMessage(null)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setForm({ reviewer_name: "", rating: 5, review_text: "" })
  }

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!productId) return
    setSaving(true)
    setMessage(null)
    try {
      if (editingId) {
        const res = await fetch(
          `/admin/cars/${productId}/reviews/${editingId}`,
          {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              reviewer_name: form.reviewer_name || "Staff",
              rating: form.rating,
              review_text: form.review_text || "",
            }),
          }
        )
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.message ?? "Failed to update review")
        }
        setMessage({ type: "success", text: "Review updated." })
        cancelEdit()
      } else {
        const res = await fetch(`/admin/cars/${productId}/reviews`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reviewer_name: form.reviewer_name || "Staff",
            rating: form.rating,
            review_text: form.review_text || "",
          }),
        })
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.message ?? "Failed to add review")
        }
        setForm({ reviewer_name: "", rating: 5, review_text: "" })
        setMessage({ type: "success", text: "Review added." })
      }
      loadReviews()
    } catch (e: any) {
      setMessage({ type: "error", text: e?.message ?? "Failed" })
    } finally {
      setSaving(false)
    }
  }

  const deleteReview = async (reviewId: string) => {
    if (!productId || !window.confirm("Delete this review?")) return
    setSaving(true)
    setMessage(null)
    try {
      const res = await fetch(
        `/admin/cars/${productId}/reviews/${reviewId}`,
        { method: "DELETE", credentials: "include" }
      )
      if (!res.ok) throw new Error("Failed to delete")
      setMessage({ type: "success", text: "Review deleted." })
      if (editingId === reviewId) cancelEdit()
      loadReviews()
    } catch (e: any) {
      setMessage({ type: "error", text: e?.message ?? "Delete failed" })
    } finally {
      setSaving(false)
    }
  }

  if (!productId) return null

  return (
    <Container className="p-4">
      <Heading level="h2" className="mb-3">
        Car Reviews
      </Heading>

      {message && (
        <Text
          size="small"
          className={
            message.type === "success" ? "text-ui-tag-green-text" : "text-ui-tag-red-text"
          }
        >
          {message.text}
        </Text>
      )}

      <form onSubmit={submitReview} className="mb-6 flex flex-col gap-3">
        {editingId && (
          <Text size="small" className="text-ui-fg-subtle">
            Editing review — click Cancel to stop.
          </Text>
        )}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <Label size="small">Reviewer name</Label>
            <Input
              placeholder="Name"
              value={form.reviewer_name}
              onChange={(e) => setForm((f) => ({ ...f, reviewer_name: e.target.value }))}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label size="small">Rating (1–5)</Label>
            <Select
              value={String(form.rating)}
              onValueChange={(v) => setForm((f) => ({ ...f, rating: Number(v) }))}
            >
              <Select.Trigger>
                <Select.Value />
              </Select.Trigger>
              <Select.Content>
                {[1, 2, 3, 4, 5].map((n) => (
                  <Select.Item key={n} value={String(n)}>
                    {n} star{n !== 1 ? "s" : ""}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Label size="small">Review</Label>
          <Textarea
            placeholder="Review text..."
            value={form.review_text}
            onChange={(e) => setForm((f) => ({ ...f, review_text: e.target.value }))}
            rows={3}
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit" size="small" disabled={saving}>
            {saving ? (editingId ? "Updating…" : "Adding…") : editingId ? "Update review" : "Add review"}
          </Button>
          {editingId && (
            <Button type="button" size="small" variant="secondary" onClick={cancelEdit}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      {loading ? (
        <Text size="small" className="text-ui-fg-subtle">
          Loading reviews…
        </Text>
      ) : reviews.length === 0 ? (
        <Text size="small" className="text-ui-fg-subtle">
          No reviews yet.
        </Text>
      ) : (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Reviewer</Table.HeaderCell>
              <Table.HeaderCell>Rating</Table.HeaderCell>
              <Table.HeaderCell>Review</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {reviews.map((r) => (
              <Table.Row key={r.id}>
                <Table.Cell>{r.reviewer_name || "—"}</Table.Cell>
                <Table.Cell>
                  <Badge
                    size="2xsmall"
                    color={
                      r.rating >= 4 ? "green" : r.rating >= 3 ? "orange" : "red"
                    }
                  >
                    {"★".repeat(r.rating)}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Text size="small" className="line-clamp-2">
                    {r.review_text || "—"}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex gap-1">
                    <Button
                      type="button"
                      variant="transparent"
                      size="small"
                      onClick={() => startEdit(r)}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="transparent"
                      size="small"
                      className="text-ui-tag-red-text"
                      onClick={() => deleteReview(r.id)}
                      disabled={saving}
                    >
                      Delete
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.after",
})

export default CarReviewsWidget
