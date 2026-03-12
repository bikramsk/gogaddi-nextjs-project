import { defineWidgetConfig } from "@medusajs/admin-sdk"
import {
  Button,
  Container,
  Heading,
  Input,
  Table,
  Text,
} from "@medusajs/ui"
import { useState, useEffect, useCallback } from "react"

type KeyValue = { key: string; value: string }

const FEATURE_GROUPS = [
  "Safety & Security",
  "Comfort & Convenience",
  "Interior",
  "Exterior",
] as const

const SPECIFICATION_GROUPS = [
  "Dimensions and Weights",
  "Fuel Economy",
  "Capacities",
  "Performance",
  "Engine",
  "Transmission",
  "Suspensions",
  "Steering",
  "Brakes",
  "Wheels and Tyres",
] as const

const emptyRow = (): KeyValue => ({ key: "", value: "" })

function parseKeyValueList(meta: unknown): KeyValue[] {
  if (Array.isArray(meta)) {
    return meta.map((item) => ({
      key: typeof item?.key === "string" ? item.key : "",
      value: item?.value != null ? String(item.value) : "",
    }))
  }
  if (meta && typeof meta === "object" && !Array.isArray(meta)) {
    return Object.entries(meta).map(([key, value]) => ({
      key,
      value: value != null ? String(value) : "",
    }))
  }
  return []
}

function parseGrouped(
  meta: unknown,
  groupKeys: readonly string[]
): Record<string, KeyValue[]> {
  const out: Record<string, KeyValue[]> = {}
  groupKeys.forEach((g) => {
    out[g] = []
  })
  if (meta && typeof meta === "object" && !Array.isArray(meta)) {
    const obj = meta as Record<string, unknown>
    Object.keys(obj).forEach((group) => {
      const list = parseKeyValueList(obj[group])
      if (groupKeys.includes(group)) {
        out[group] = list.length ? list : [emptyRow()]
      }
    })
  }
  groupKeys.forEach((g) => {
    if (!out[g]?.length) out[g] = [emptyRow()]
  })
  return out
}

function groupedToPayload(grouped: Record<string, KeyValue[]>): Record<string, { key: string; value: string }[]> {
  const out: Record<string, { key: string; value: string }[]> = {}
  Object.entries(grouped).forEach(([group, rows]) => {
    const filtered = rows.filter((r) => r.key.trim())
    if (filtered.length) out[group] = filtered.map(({ key, value }) => ({ key, value }))
  })
  return out
}

const FeaturesSpecificationsWidget = (props: any) => {
  const product = props?.data?.product ?? props?.data
  const productId = product?.id
  const existingMeta = product?.metadata ?? {}

  const [featuresByGroup, setFeaturesByGroup] = useState<Record<string, KeyValue[]>>({})
  const [specsByGroup, setSpecsByGroup] = useState<Record<string, KeyValue[]>>({})
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const loadFromMeta = useCallback(() => {
    setFeaturesByGroup(parseGrouped(existingMeta.features, FEATURE_GROUPS))
    setSpecsByGroup(parseGrouped(existingMeta.specifications, SPECIFICATION_GROUPS))
  }, [existingMeta.features, existingMeta.specifications])

  useEffect(() => {
    loadFromMeta()
  }, [loadFromMeta])

  const updateRow = (
    setter: React.Dispatch<React.SetStateAction<Record<string, KeyValue[]>>>,
    group: string,
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    setter((prev) => {
      const list = [...(prev[group] ?? [emptyRow()])]
      if (!list[index]) list[index] = emptyRow()
      list[index] = { ...list[index], [field]: value }
      return { ...prev, [group]: list }
    })
  }

  const addRow = (
    setter: React.Dispatch<React.SetStateAction<Record<string, KeyValue[]>>>,
    group: string
  ) => {
    setter((prev) => ({
      ...prev,
      [group]: [...(prev[group] ?? []), emptyRow()],
    }))
  }

  const removeRow = (
    setter: React.Dispatch<React.SetStateAction<Record<string, KeyValue[]>>>,
    group: string,
    index: number
  ) => {
    setter((prev) => ({
      ...prev,
      [group]: (prev[group] ?? []).filter((_, i) => i !== index),
    }))
  }

  const save = async () => {
    if (!productId) return
    setSaving(true)
    setMessage(null)
    try {
      const featuresPayload = groupedToPayload(featuresByGroup)
      const specsPayload = groupedToPayload(specsByGroup)
      const { ...restMeta } = existingMeta as Record<string, unknown>
      const res = await fetch(`/admin/products/${productId}/metadata`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          metadata: {
            ...restMeta,
            features: featuresPayload,
            specifications: specsPayload,
          },
        }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message ?? "Failed to update metadata")
      }
      setMessage({ type: "success", text: "Features and specifications saved." })
    } catch (e: any) {
      setMessage({ type: "error", text: e?.message ?? "Save failed" })
    } finally {
      setSaving(false)
    }
  }

  if (!productId) return null

  const renderGroupTable = (
    group: string,
    rows: KeyValue[],
    setter: React.Dispatch<React.SetStateAction<Record<string, KeyValue[]>>>,
    addLabel: string
  ) => (
    <div key={group} className="mb-6">
      <Text size="small" weight="plus" className="mb-2 block text-ui-fg-subtle uppercase tracking-wide">
        {group}
      </Text>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Key</Table.HeaderCell>
            <Table.HeaderCell>Value</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {(rows.length ? rows : [emptyRow()]).map((row, i) => (
            <Table.Row key={i}>
              <Table.Cell>
                <Input
                  placeholder="Key"
                  value={row.key}
                  onChange={(e) => updateRow(setter, group, i, "key", e.target.value)}
                />
              </Table.Cell>
              <Table.Cell>
                <Input
                  placeholder="Value"
                  value={row.value}
                  onChange={(e) => updateRow(setter, group, i, "value", e.target.value)}
                />
              </Table.Cell>
              <Table.Cell>
                <Button
                  variant="transparent"
                  size="small"
                  onClick={() => removeRow(setter, group, i)}
                >
                  Remove
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Button
        variant="secondary"
        size="small"
        className="mt-2"
        onClick={() => addRow(setter, group)}
      >
        {addLabel}
      </Button>
    </div>
  )

  return (
    <Container className="p-4 divide-y divide-ui-border-base">
      <div className="flex items-center justify-between mb-4">
        <Heading level="h2">Features &amp; Specifications (Metadata)</Heading>
        <Button size="small" onClick={save} disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </Button>
      </div>

      {message && (
        <Text
          size="small"
          className={message.type === "success" ? "text-ui-tag-green-text" : "text-ui-tag-red-text"}
        >
          {message.text}
        </Text>
      )}

      {/* Features – nested tables by group */}
      <div className="pt-4">
        <Heading level="h3" className="mb-3">
          Features
        </Heading>
        {FEATURE_GROUPS.map((group) =>
          renderGroupTable(
            group,
            featuresByGroup[group] ?? [emptyRow()],
            setFeaturesByGroup,
            "+ Add row"
          )
        )}
      </div>

      {/* Specifications – nested tables by group */}
      <div className="pt-6 border-t border-ui-border-base">
        <Heading level="h3" className="mb-3">
          Specifications
        </Heading>
        {SPECIFICATION_GROUPS.map((group) =>
          renderGroupTable(
            group,
            specsByGroup[group] ?? [emptyRow()],
            setSpecsByGroup,
            "+ Add row"
          )
        )}
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.after",
})

export default FeaturesSpecificationsWidget
