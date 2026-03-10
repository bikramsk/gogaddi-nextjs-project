import CarModuleService from "./service"
import { Module } from "@medusajs/framework/utils"

export const CAR_MODULE = "carModule"

export default Module(CAR_MODULE, {
  service: CarModuleService,
})
