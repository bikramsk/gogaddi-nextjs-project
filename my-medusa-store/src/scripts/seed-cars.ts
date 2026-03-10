import { ExecArgs } from "@medusajs/framework/types"
import { CAR_MODULE } from "../modules/car"
import type CarModuleService from "../modules/car/service"

const MAKES = ["Toyota", "Honda", "BMW", "Tesla", "Audi", "Ford"] as const

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default async function seedCars({ container }: ExecArgs): Promise<void> {
  const carService = container.resolve(CAR_MODULE) as CarModuleService

  const cars: { id: string; make: string; model: string; year: number; price: number }[] = []

  for (let i = 0; i < 50; i++) {
    const make = MAKES[randomInt(0, MAKES.length - 1)]
    cars.push({
      id: crypto.randomUUID(),
      make,
      model: `Model-${i + 1}`,
      year: randomInt(2015, 2024),
      price: randomInt(10000, 80000),
    })
  }

  await carService.createCars(cars)
  console.log("50 cars inserted successfully")
}
