/**
 * Placeholder image URL for products/cars when no image is available.
 * SVG data URL (gray car icon) - works with next/image without extra config.
 */
export const PLACEHOLDER_IMAGE_URL =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" fill="none"><rect width="400" height="300" fill="#e5e7eb"/><path d="M80 200h240v20H80zM100 160l30-60h140l30 60v40H100v-40z" stroke="#9ca3af" stroke-width="2" fill="#f3f4f6"/><circle cx="120" cy="220" r="20" stroke="#9ca3af" stroke-width="2" fill="#fff"/><circle cx="280" cy="220" r="20" stroke="#9ca3af" stroke-width="2" fill="#fff"/><text x="200" y="155" font-family="sans-serif" font-size="14" fill="#6b7280" text-anchor="middle">No image</text></svg>'
  )
