import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

export const runtime = "nodejs"

const UPLOAD_DIR = "car-uploads"
const MAX_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]

function getExt(mime: string): string {
  const map: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
  }
  return map[mime] || ".jpg"
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const files = formData.getAll("file") as File[]
    if (!files?.length) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const dir = path.join(process.cwd(), "public", UPLOAD_DIR)
    await mkdir(dir, { recursive: true })

    const urls: string[] = []
    for (const file of files) {
      if (!(file instanceof File)) continue
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: `Invalid type: ${file.type}. Use JPEG, PNG, WebP or GIF.` },
          { status: 400 }
        )
      }
      if (file.size > MAX_SIZE) {
        return NextResponse.json(
          { error: `File too large: ${file.name}. Max 5MB.` },
          { status: 400 }
        )
      }
      const ext = getExt(file.type)
      const name = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${ext}`
      const filePath = path.join(dir, name)
      const buf = new Uint8Array(await file.arrayBuffer())
      await writeFile(filePath, buf)
      urls.push(`/${UPLOAD_DIR}/${name}`)
    }

    return NextResponse.json({ urls })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Upload failed" },
      { status: 500 }
    )
  }
}
