import CarsModuleService from "./services/car-service"
import { Module } from "@medusajs/framework/utils"

export const CARS_MODULE = "carsModule"

export default Module(CARS_MODULE, {
  service: CarsModuleService,
})
