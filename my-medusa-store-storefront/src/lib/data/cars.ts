"use server"

import { sdk } from "@lib/config"
import { getCacheOptions } from "./cookies"

export type Car = {
  id: string
  make: string
  model: string
  year: number
  price: number
}

type CarsResponse = {
  cars: Car[]
}

export async function listCars(): Promise<{ cars: Car[]; error?: string }> {
  try {
    const next = {
      ...(await getCacheOptions("cars")),
      revalidate: 60,
    }

    const data = await sdk.client.fetch<CarsResponse>("/store/cars", {
      method: "GET",
      next,
      cache: "force-cache",
    })

    return { cars: data?.cars ?? [] }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error"
    const backendUrl = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
    return {
      cars: [],
      error: `Could not fetch cars: ${message}. Is the Medusa backend running at ${backendUrl}?`,
    }
  }
}
