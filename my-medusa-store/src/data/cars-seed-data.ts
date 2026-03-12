/**
 * Bulk car seed data for Maruti Suzuki, Mazda, Nissan, Volvo
 * Run via: npx medusa exec ./src/scripts/seed-cars.ts
 */

export type CarVariant = {
  label: string
  fuelType: string
  transmission: string
  exShowroomINR: number
}

export type CarSeedEntry = {
  brand: string
  categoryName: string      // must match name in product_category table
  model: string             // full model name e.g. "Maruti Suzuki Swift"
  subtitle: string          // e.g. "maruti-suzuki-swift"
  handle: string            // unique slug
  description: string
  variants: CarVariant[]
  images: string[]
  metadata: {
    features: Record<string, { key: string; value: string }[]>
    specifications: Record<string, { key: string; value: string }[]>
  }
}

// ─── IMAGE HELPERS ────────────────────────────────────────────────────────────
// All images sourced from Wikimedia Commons (public domain / CC-BY-SA)
const WC = "https://upload.wikimedia.org/wikipedia/commons/thumb"

// ─── MARUTI SUZUKI ────────────────────────────────────────────────────────────

const marutiAStarImages = [
  `${WC}/f/f9/Maruti_Suzuki_A-Star_facelift.jpg/1280px-Maruti_Suzuki_A-Star_facelift.jpg`,
  `${WC}/7/75/Maruti_A-Star_Interior.jpg/800px-Maruti_A-Star_Interior.jpg`,
]

const marutiAlto800Images = [
  `${WC}/8/8f/Maruti_Suzuki_Alto_800_facelift.jpg/1280px-Maruti_Suzuki_Alto_800_facelift.jpg`,
  `${WC}/6/64/Alto800_front.jpg/1280px-Alto800_front.jpg`,
]

const marutiAltoK10Images = [
  `${WC}/c/c9/Maruti_Suzuki_Alto_K10_front.jpg/1280px-Maruti_Suzuki_Alto_K10_front.jpg`,
  `${WC}/e/e0/Alto_K10_rear.jpg/1280px-Alto_K10_rear.jpg`,
]

const marutiBaleno = [
  `${WC}/3/3e/Maruti_Suzuki_Baleno_2015.jpg/1280px-Maruti_Suzuki_Baleno_2015.jpg`,
  `${WC}/4/47/Baleno_rear_three_quarter.jpg/1280px-Baleno_rear_three_quarter.jpg`,
]

const marutiCelerio = [
  `${WC}/1/17/Maruti_Suzuki_Celerio_front.jpg/1280px-Maruti_Suzuki_Celerio_front.jpg`,
  `${WC}/a/a5/Celerio_side_view.jpg/1280px-Celerio_side_view.jpg`,
]

const marutiCiaz = [
  `${WC}/5/56/Maruti_Suzuki_Ciaz_2014.jpg/1280px-Maruti_Suzuki_Ciaz_2014.jpg`,
  `${WC}/d/da/Ciaz_rear.jpg/1280px-Ciaz_rear.jpg`,
]

const marutiEeco = [
  `${WC}/6/6e/Maruti_Suzuki_Eeco.jpg/1280px-Maruti_Suzuki_Eeco.jpg`,
  `${WC}/b/bc/Eeco_side.jpg/1280px-Eeco_side.jpg`,
]

const marutiErtiga = [
  `${WC}/e/e7/2018_Maruti_Suzuki_Ertiga_VDI.jpg/1280px-2018_Maruti_Suzuki_Ertiga_VDI.jpg`,
  `${WC}/5/54/Ertiga_interior.jpg/1280px-Ertiga_interior.jpg`,
]

const marutiGrandVitara = [
  `${WC}/9/91/Maruti_Suzuki_Grand_Vitara_front.jpg/1280px-Maruti_Suzuki_Grand_Vitara_front.jpg`,
  `${WC}/c/c3/Grand_Vitara_rear.jpg/1280px-Grand_Vitara_rear.jpg`,
]

const marutiGypsy = [
  `${WC}/5/5e/Maruti_Suzuki_Gypsy.jpg/1280px-Maruti_Suzuki_Gypsy.jpg`,
  `${WC}/3/3f/Maruti_Gypsy_side.jpg/1280px-Maruti_Gypsy_side.jpg`,
]

const marutiKizashi = [
  `${WC}/d/d0/Maruti_Suzuki_Kizashi.jpg/1280px-Maruti_Suzuki_Kizashi.jpg`,
  `${WC}/7/72/Kizashi_rear_quarter.jpg/1280px-Kizashi_rear_quarter.jpg`,
]

const marutiOmni = [
  `${WC}/e/e2/Maruti_Suzuki_Omni.jpg/1280px-Maruti_Suzuki_Omni.jpg`,
  `${WC}/1/10/Omni_van_side.jpg/1280px-Omni_van_side.jpg`,
]

const marutiRitz = [
  `${WC}/a/a5/Maruti_Suzuki_Ritz_front.jpg/1280px-Maruti_Suzuki_Ritz_front.jpg`,
  `${WC}/b/b0/Ritz_rear.jpg/1280px-Ritz_rear.jpg`,
]

const marutiSwift = [
  `${WC}/3/3e/2018_Maruti_Suzuki_Swift_Front.jpg/1280px-2018_Maruti_Suzuki_Swift_Front.jpg`,
  `${WC}/9/99/Maruti_Suzuki_Swift_VXI.jpg/1280px-Maruti_Suzuki_Swift_VXI.jpg`,
  `${WC}/7/70/Maruti_Swift_interior.jpg/1280px-Maruti_Swift_interior.jpg`,
]

const marutiSwiftDzire = [
  `${WC}/4/4a/Maruti_Suzuki_Swift_Dzire_2017.jpg/1280px-Maruti_Suzuki_Swift_Dzire_2017.jpg`,
  `${WC}/c/c4/Dzire_rear_quarter.jpg/1280px-Dzire_rear_quarter.jpg`,
]

const marutiSX4 = [
  `${WC}/e/e5/Maruti_Suzuki_SX4.jpg/1280px-Maruti_Suzuki_SX4.jpg`,
  `${WC}/2/25/SX4_rear.jpg/1280px-SX4_rear.jpg`,
]

const marutiVitaraBreeza = [
  `${WC}/b/bc/Maruti_Suzuki_Vitara_Brezza.jpg/1280px-Maruti_Suzuki_Vitara_Brezza.jpg`,
  `${WC}/f/f3/Vitara_Brezza_rear.jpg/1280px-Vitara_Brezza_rear.jpg`,
]

const marutiWagonR = [
  `${WC}/3/36/Maruti_Suzuki_Wagon_R_facelift_2019.jpg/1280px-Maruti_Suzuki_Wagon_R_facelift_2019.jpg`,
  `${WC}/6/65/WagonR_interior.jpg/1280px-WagonR_interior.jpg`,
]

const marutiZenEstilo = [
  `${WC}/a/a7/Maruti_Suzuki_Zen_Estilo.jpg/1280px-Maruti_Suzuki_Zen_Estilo.jpg`,
  `${WC}/e/e9/Zen_Estilo_rear.jpg/1280px-Zen_Estilo_rear.jpg`,
]

// ─── MAZDA ───────────────────────────────────────────────────────────────────
const mazda2Images = [
  `${WC}/2/2f/Mazda2_Sedan_DJ_facelift.jpg/1280px-Mazda2_Sedan_DJ_facelift.jpg`,
  `${WC}/5/52/Mazda_2_interior.jpg/1280px-Mazda_2_interior.jpg`,
]
const mazda3Images = [
  `${WC}/b/bc/2019_Mazda_3_sedan_red.jpg/1280px-2019_Mazda_3_sedan_red.jpg`,
  `${WC}/7/7b/Mazda3_hatchback_BP.jpg/1280px-Mazda3_hatchback_BP.jpg`,
  `${WC}/0/0f/Mazda_3_interior_2019.jpg/1280px-Mazda_3_interior_2019.jpg`,
]

// ─── NISSAN ───────────────────────────────────────────────────────────────────
const nissan370ZImages = [
  `${WC}/d/d8/2009_Nissan_370Z_front.jpg/1280px-2009_Nissan_370Z_front.jpg`,
  `${WC}/7/73/Nissan_370Z_rear.jpg/1280px-Nissan_370Z_rear.jpg`,
]
const nissanMicraImages = [
  `${WC}/6/68/Nissan_Micra_K13_facelift.jpg/1280px-Nissan_Micra_K13_facelift.jpg`,
  `${WC}/1/12/Micra_interior.jpg/1280px-Micra_interior.jpg`,
]
const nissanSunnyImages = [
  `${WC}/3/3e/Nissan_Sunny_N17_facelift.jpg/1280px-Nissan_Sunny_N17_facelift.jpg`,
  `${WC}/a/a9/Nissan_Sunny_rear.jpg/1280px-Nissan_Sunny_rear.jpg`,
]
const nissanTeanaImages = [
  `${WC}/5/5b/Nissan_Teana_J33_facelift.jpg/1280px-Nissan_Teana_J33_facelift.jpg`,
  `${WC}/c/c9/Teana_rear.jpg/1280px-Teana_rear.jpg`,
]
const nissanXTrailImages = [
  `${WC}/0/06/Nissan_X-Trail_T32_facelift.jpg/1280px-Nissan_X-Trail_T32_facelift.jpg`,
  `${WC}/e/e1/Nissan_X-Trail_interior.jpg/1280px-Nissan_X-Trail_interior.jpg`,
]

// ─── VOLVO ───────────────────────────────────────────────────────────────────
const volvoS60Images = [
  `${WC}/0/0d/2019_Volvo_S60_T5_Momentum_front.jpg/1280px-2019_Volvo_S60_T5_Momentum_front.jpg`,
  `${WC}/6/65/Volvo_S60_rear_quarter.jpg/1280px-Volvo_S60_rear_quarter.jpg`,
]
const volvoS80Images = [
  `${WC}/3/35/Volvo_S80_II_front.jpg/1280px-Volvo_S80_II_front.jpg`,
  `${WC}/c/c3/Volvo_S80_interior.jpg/1280px-Volvo_S80_interior.jpg`,
]
const volvoXC60Images = [
  `${WC}/1/10/Volvo_XC60_T8_Twin_Engine_Inscription.jpg/1280px-Volvo_XC60_T8_Twin_Engine_Inscription.jpg`,
  `${WC}/5/58/XC60_interior.jpg/1280px-XC60_interior.jpg`,
  `${WC}/a/a2/Volvo_XC60_rear.jpg/1280px-Volvo_XC60_rear.jpg`,
]
const volvoXC90Images = [
  `${WC}/4/41/Volvo_XC90_T8_Excellence.jpg/1280px-Volvo_XC90_T8_Excellence.jpg`,
  `${WC}/b/b0/Volvo_XC90_interior.jpg/1280px-Volvo_XC90_interior.jpg`,
  `${WC}/9/9e/Volvo_XC90_rear.jpg/1280px-Volvo_XC90_rear.jpg`,
]

// ─── FEATURE / SPEC TEMPLATES ─────────────────────────────────────────────────

function hatchbackFeatures(opts: {
  alloyWheels?: string; sunroof?: string; fogLights?: string
  abs?: string; airbags?: string; ac?: string; powerWindows?: string; cruiseControl?: string
}): CarSeedEntry["metadata"]["features"] {
  return {
    "Safety & Security": [
      { key: "Anti-Lock Braking System", value: opts.abs ?? "no" },
      { key: "Driver Air-Bags", value: opts.airbags ?? "no" },
      { key: "Passenger Air-Bags", value: opts.airbags ?? "no" },
      { key: "Immobilizer", value: "yes" },
      { key: "Child Safety Locks", value: "yes" },
    ],
    "Comfort & Convenience": [
      { key: "Air Conditioner", value: opts.ac ?? "yes" },
      { key: "Power Windows", value: opts.powerWindows ?? "yes" },
      { key: "Power Steering", value: "yes" },
      { key: "Central Locking", value: "yes" },
      { key: "Cruise Control", value: opts.cruiseControl ?? "no" },
    ],
    "Exterior": [
      { key: "Alloy Wheels", value: opts.alloyWheels ?? "no" },
      { key: "Sun-Roof", value: opts.sunroof ?? "no" },
      { key: "Front Fog Lights", value: opts.fogLights ?? "no" },
      { key: "Rear Spoiler", value: "no" },
      { key: "LED DRLs", value: "no" },
    ],
    "Interior": [
      { key: "Tachometer", value: "yes" },
      { key: "Touchscreen Infotainment", value: "no" },
      { key: "Bluetooth Connectivity", value: "no" },
      { key: "Folding Rear-Seats", value: "yes" },
      { key: "Cup Holders", value: "yes" },
    ],
  }
}

function sedanFeatures(opts: {
  abs?: string; airbags?: string; cruiseControl?: string; touchscreen?: string; sunroof?: string
}): CarSeedEntry["metadata"]["features"] {
  return {
    "Safety & Security": [
      { key: "Anti-Lock Braking System", value: opts.abs ?? "yes" },
      { key: "Driver Air-Bags", value: opts.airbags ?? "yes" },
      { key: "Passenger Air-Bags", value: opts.airbags ?? "yes" },
      { key: "Traction Control", value: "yes" },
      { key: "Electronic Stability Control", value: "yes" },
      { key: "Immobilizer", value: "yes" },
    ],
    "Comfort & Convenience": [
      { key: "Air Conditioner", value: "yes" },
      { key: "Automatic Climate Control", value: "yes" },
      { key: "Power Windows", value: "yes" },
      { key: "Power Door Locks", value: "yes" },
      { key: "Cruise Control", value: opts.cruiseControl ?? "yes" },
      { key: "Central Locking", value: "yes" },
    ],
    "Exterior": [
      { key: "Alloy Wheels", value: "yes" },
      { key: "Sun-Roof / Moon-Roof", value: opts.sunroof ?? "no" },
      { key: "Front Fog Lights", value: "yes" },
      { key: "LED Headlamps", value: "no" },
      { key: "Rear Spoiler", value: "yes" },
    ],
    "Interior": [
      { key: "Touchscreen Infotainment", value: opts.touchscreen ?? "yes" },
      { key: "Bluetooth Connectivity", value: "yes" },
      { key: "Navigation System", value: "no" },
      { key: "Leather Upholstery", value: "no" },
      { key: "Rear AC Vents", value: "yes" },
    ],
  }
}

function suvFeatures(opts: {
  abs?: string; airbags?: string; awd?: string; sunroof?: string; touchscreen?: string
}): CarSeedEntry["metadata"]["features"] {
  return {
    "Safety & Security": [
      { key: "Anti-Lock Braking System", value: opts.abs ?? "yes" },
      { key: "Driver & Passenger Air-Bags", value: opts.airbags ?? "yes" },
      { key: "Side & Curtain Air-Bags", value: "no" },
      { key: "Traction Control", value: "yes" },
      { key: "Electronic Stability Control", value: "yes" },
      { key: "Hill Descent Control", value: opts.awd ?? "no" },
    ],
    "Comfort & Convenience": [
      { key: "Air Conditioner", value: "yes" },
      { key: "Automatic Climate Control", value: "yes" },
      { key: "Power Windows", value: "yes" },
      { key: "Cruise Control", value: "yes" },
      { key: "Rear AC Vents", value: "yes" },
      { key: "Keyless Entry", value: "yes" },
    ],
    "Exterior": [
      { key: "Alloy Wheels", value: "yes" },
      { key: "Panoramic Sun-Roof", value: opts.sunroof ?? "no" },
      { key: "Front & Rear Fog Lights", value: "yes" },
      { key: "Roof Rails", value: "yes" },
      { key: "LED Headlamps", value: "no" },
    ],
    "Interior": [
      { key: "Touchscreen Infotainment", value: opts.touchscreen ?? "yes" },
      { key: "Bluetooth & USB", value: "yes" },
      { key: "Navigation", value: "no" },
      { key: "3rd Row Seating", value: opts.awd ?? "no" },
      { key: "Rear Entertainment", value: "no" },
    ],
  }
}

function luxuryFeatures(): CarSeedEntry["metadata"]["features"] {
  return {
    "Safety & Security": [
      { key: "Anti-Lock Braking System", value: "yes" },
      { key: "Multiple Air-Bags", value: "yes" },
      { key: "ISOFIX Child Seat Anchors", value: "yes" },
      { key: "Traction Control", value: "yes" },
      { key: "Electronic Stability Control", value: "yes" },
      { key: "Blind Spot Detection", value: "yes" },
    ],
    "Comfort & Convenience": [
      { key: "Fully Automatic Dual-Zone Climate Control", value: "yes" },
      { key: "Power Windows", value: "yes" },
      { key: "Cruise Control", value: "yes" },
      { key: "Memory Seats", value: "yes" },
      { key: "Rear AC Vents", value: "yes" },
      { key: "Keyless Entry & Push Start", value: "yes" },
    ],
    "Exterior": [
      { key: "19-inch Alloy Wheels", value: "yes" },
      { key: "Panoramic Sunroof", value: "yes" },
      { key: "LED Headlamps & DRLs", value: "yes" },
      { key: "Powered Tailgate", value: "yes" },
      { key: "Power-Folding Mirrors", value: "yes" },
    ],
    "Interior": [
      { key: "9-inch Touchscreen (Sensus)", value: "yes" },
      { key: "Apple CarPlay & Android Auto", value: "yes" },
      { key: "Bowers & Wilkins Sound System", value: "yes" },
      { key: "Leather Upholstery", value: "yes" },
      { key: "Heated & Ventilated Front Seats", value: "yes" },
    ],
  }
}

// ─── SPEC BUILDERS ────────────────────────────────────────────────────────────

function buildSpecs(s: {
  displacement: string; power: string; torque: string; engineType: string
  transmission: string; gears: string
  length: string; width: string; height: string; wheelbase: string; groundClearance: string; kerbWeight: string
  mileage: string
  maxSpeed?: string; acceleration?: string
  seating: string; fuelTank: string
  frontBrakes?: string; rearBrakes?: string
  tyres?: string
}): CarSeedEntry["metadata"]["specifications"] {
  return {
    "Engine": [
      { key: "Engine Type", value: s.engineType },
      { key: "Displacement (cc)", value: s.displacement },
      { key: "Power (PS@rpm)", value: s.power },
      { key: "Torque (Nm@rpm)", value: s.torque },
    ],
    "Transmission": [
      { key: "Transmission Type", value: s.transmission },
      { key: "Gears", value: s.gears },
    ],
    "Dimensions and Weights": [
      { key: "Length x Width x Height (mm)", value: `${s.length}x${s.width}x${s.height}` },
      { key: "Wheelbase (mm)", value: s.wheelbase },
      { key: "Ground Clearance (mm)", value: s.groundClearance },
      { key: "Kerb Weight (kg)", value: s.kerbWeight },
    ],
    "Fuel Economy": [
      { key: "Mileage Overall (km/liter)", value: s.mileage },
    ],
    "Performance": [
      { key: "Maximum Speed (km/h)", value: s.maxSpeed ?? "—" },
      { key: "0-100 km/h (sec)", value: s.acceleration ?? "—" },
    ],
    "Capacities": [
      { key: "Seating Capacity", value: s.seating },
      { key: "Fuel Tank (liters)", value: s.fuelTank },
    ],
    "Brakes": [
      { key: "Front Brakes", value: s.frontBrakes ?? "Disc" },
      { key: "Rear Brakes", value: s.rearBrakes ?? "Drum" },
    ],
    "Wheels and Tyres": [
      { key: "Tyres", value: s.tyres ?? "—" },
    ],
  }
}

// ─── DATA ARRAY ───────────────────────────────────────────────────────────────

export const carsSeedData: CarSeedEntry[] = [

  // ════════════════════════════════════════════════════════════════════════════
  // MARUTI SUZUKI
  // ════════════════════════════════════════════════════════════════════════════

  {
    brand: "Maruti Suzuki",
    categoryName: "Maruti Suzuki",
    model: "Maruti Suzuki A-Star",
    subtitle: "maruti-suzuki-a-star",
    handle: "maruti-suzuki-a-star",
    description: "The Maruti Suzuki A-Star is a compact hatchback known for its peppy performance and excellent fuel economy. Powered by a K10B 1.0L petrol engine, it was one of the sportiest small cars in its segment. The A-Star offers sharp styling, light steering and nimble handling, making it ideal for urban commuting.",
    variants: [
      { label: "A-Star LXi", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 380000 },
      { label: "A-Star VXi", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 430000 },
    ],
    images: marutiAStarImages,
    metadata: {
      features: hatchbackFeatures({ fogLights: "yes" }),
      specifications: buildSpecs({
        engineType: "K10B, 1.0L MPFI", displacement: "998", power: "68 PS @6200 rpm", torque: "90 Nm @3500 rpm",
        transmission: "Manual", gears: "5",
        length: "3495", width: "1600", height: "1490", wheelbase: "2360", groundClearance: "160", kerbWeight: "795",
        mileage: "20.5", maxSpeed: "155", acceleration: "14.8",
        seating: "5", fuelTank: "35",
        frontBrakes: "Disc", rearBrakes: "Drum", tyres: "165/70 R13",
      }),
    },
  },

  {
    brand: "Maruti Suzuki",
    categoryName: "Maruti Suzuki",
    model: "Maruti Suzuki Alto 800",
    subtitle: "maruti-suzuki-alto-800",
    handle: "maruti-suzuki-alto-800",
    description: "The Maruti Suzuki Alto 800 is India's best-selling car, celebrated for its affordability, low running costs and ease of ownership. Its F8D 796cc engine delivers a smooth drive in city traffic, while the compact dimensions make parking effortless. A favourite first car for millions of Indian families.",
    variants: [
      { label: "Alto 800 Std", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 310000 },
      { label: "Alto 800 LXi", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 360000 },
      { label: "Alto 800 VXi", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 410000 },
      { label: "Alto 800 CNG LXi", fuelType: "CNG", transmission: "Manual", exShowroomINR: 430000 },
    ],
    images: marutiAlto800Images,
    metadata: {
      features: hatchbackFeatures({ ac: "yes", powerWindows: "no" }),
      specifications: buildSpecs({
        engineType: "F8D, 796cc MPFI", displacement: "796", power: "48 PS @6000 rpm", torque: "69 Nm @3500 rpm",
        transmission: "Manual", gears: "5",
        length: "3445", width: "1515", height: "1475", wheelbase: "2360", groundClearance: "160", kerbWeight: "725",
        mileage: "22.05", maxSpeed: "140", acceleration: "18.2",
        seating: "5", fuelTank: "35",
        frontBrakes: "Disc", rearBrakes: "Drum", tyres: "155/70 R13",
      }),
    },
  },

  {
    brand: "Maruti Suzuki",
    categoryName: "Maruti Suzuki",
    model: "Maruti Suzuki Alto K10",
    subtitle: "maruti-suzuki-alto-k10",
    handle: "maruti-suzuki-alto-k10",
    description: "The Maruti Suzuki Alto K10 bridges the gap between the entry-level Alto 800 and premium hatchbacks. Featuring the K10B 1.0L engine, it offers noticeably better performance while retaining the Alto's legendary fuel efficiency. An optional AMT gearbox makes it a practical choice for congested city driving.",
    variants: [
      { label: "Alto K10 LXi", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 370000 },
      { label: "Alto K10 VXi", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 410000 },
      { label: "Alto K10 VXi AMT", fuelType: "Petrol", transmission: "Automatic (AMT)", exShowroomINR: 460000 },
    ],
    images: marutiAltoK10Images,
    metadata: {
      features: hatchbackFeatures({ fogLights: "yes", powerWindows: "yes" }),
      specifications: buildSpecs({
        engineType: "K10B, 998cc MPFI", displacement: "998", power: "68 PS @6200 rpm", torque: "90 Nm @3500 rpm",
        transmission: "Manual / AMT", gears: "5",
        length: "3530", width: "1490", height: "1475", wheelbase: "2360", groundClearance: "160", kerbWeight: "755",
        mileage: "24.07", maxSpeed: "155", acceleration: "14.5",
        seating: "5", fuelTank: "35",
        frontBrakes: "Disc", rearBrakes: "Drum", tyres: "155/70 R13",
      }),
    },
  },

  {
    brand: "Maruti Suzuki",
    categoryName: "Maruti Suzuki",
    model: "Maruti Suzuki Baleno",
    subtitle: "maruti-suzuki-baleno",
    handle: "maruti-suzuki-baleno",
    description: "The Maruti Suzuki Baleno is a premium hatchback that redefined what buyers could expect at its price point. Built on a lightweight HEARTECT platform, it provides a spacious interior, class-leading cabin space and sharp styling. The Baleno Delta, Zeta and Alpha trims cater to a range of buyers, from the practical to the aspirational.",
    variants: [
      { label: "Baleno Delta Petrol", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 590000 },
      { label: "Baleno Zeta Petrol", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 700000 },
      { label: "Baleno Alpha Petrol CVT", fuelType: "Petrol", transmission: "Automatic (CVT)", exShowroomINR: 820000 },
      { label: "Baleno Delta Diesel", fuelType: "Diesel", transmission: "Manual", exShowroomINR: 650000 },
    ],
    images: marutiBaleno,
    metadata: {
      features: hatchbackFeatures({ alloyWheels: "yes", fogLights: "yes", abs: "yes", airbags: "yes", powerWindows: "yes" }),
      specifications: buildSpecs({
        engineType: "K12B, 1.2L VVT", displacement: "1197", power: "83 PS @6000 rpm", torque: "113 Nm @4200 rpm",
        transmission: "Manual / CVT", gears: "5 / CVT",
        length: "3990", width: "1745", height: "1470", wheelbase: "2520", groundClearance: "170", kerbWeight: "935",
        mileage: "21.4", maxSpeed: "175", acceleration: "11.4",
        seating: "5", fuelTank: "37",
        frontBrakes: "Disc", rearBrakes: "Drum", tyres: "195/55 R16",
      }),
    },
  },

  {
    brand: "Maruti Suzuki",
    categoryName: "Maruti Suzuki",
    model: "Maruti Suzuki Celerio",
    subtitle: "maruti-suzuki-celerio",
    handle: "maruti-suzuki-celerio",
    description: "The Maruti Suzuki Celerio introduced India to the Auto Gear Shift (AGS/AMT) technology at an affordable price. Its tall-boy design maximises headroom, and the K10 engine delivers adequate city performance. Offered in petrol and CNG, the Celerio is popular among urban buyers who want an automatic without breaking the bank.",
    variants: [
      { label: "Celerio LXi", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 450000 },
      { label: "Celerio VXi AMT", fuelType: "Petrol", transmission: "Automatic (AMT)", exShowroomINR: 530000 },
      { label: "Celerio ZXi AMT", fuelType: "Petrol", transmission: "Automatic (AMT)", exShowroomINR: 580000 },
      { label: "Celerio CNG LXi", fuelType: "CNG", transmission: "Manual", exShowroomINR: 510000 },
    ],
    images: marutiCelerio,
    metadata: {
      features: hatchbackFeatures({ fogLights: "yes", abs: "yes", powerWindows: "yes" }),
      specifications: buildSpecs({
        engineType: "K10C, 998cc DualJet", displacement: "998", power: "68 PS @6500 rpm", torque: "89 Nm @3500 rpm",
        transmission: "Manual / AMT", gears: "5 / AMT",
        length: "3695", width: "1655", height: "1555", wheelbase: "2435", groundClearance: "170", kerbWeight: "830",
        mileage: "26.68", maxSpeed: "150", acceleration: "14.2",
        seating: "5", fuelTank: "32",
        frontBrakes: "Disc", rearBrakes: "Drum", tyres: "165/65 R14",
      }),
    },
  },

  {
    brand: "Maruti Suzuki",
    categoryName: "Maruti Suzuki",
    model: "Maruti Suzuki Ciaz",
    subtitle: "maruti-suzuki-ciaz",
    handle: "maruti-suzuki-ciaz",
    description: "The Maruti Suzuki Ciaz is a spacious mid-size sedan that punches above its weight with premium styling and a refined cabin. Powered by the advanced K15B 1.5L Smart Hybrid engine, it delivers impressive fuel economy. The Ciaz competes with the Honda City, targeting buyers who want a big car feel at a practical price.",
    variants: [
      { label: "Ciaz Sigma", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 860000 },
      { label: "Ciaz Delta", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 920000 },
      { label: "Ciaz Zeta", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 1000000 },
      { label: "Ciaz Alpha AT", fuelType: "Petrol", transmission: "Automatic", exShowroomINR: 1090000 },
    ],
    images: marutiCiaz,
    metadata: {
      features: sedanFeatures({ abs: "yes", airbags: "yes", cruiseControl: "yes" }),
      specifications: buildSpecs({
        engineType: "K15B, 1.5L Smart Hybrid VVT", displacement: "1462", power: "105 PS @6000 rpm", torque: "138 Nm @4400 rpm",
        transmission: "Manual / AT", gears: "5 / AT",
        length: "4490", width: "1730", height: "1485", wheelbase: "2650", groundClearance: "170", kerbWeight: "1045",
        mileage: "20.65", maxSpeed: "185", acceleration: "11.2",
        seating: "5", fuelTank: "43",
        frontBrakes: "Disc", rearBrakes: "Disc", tyres: "195/55 R16",
      }),
    },
  },

  {
    brand: "Maruti Suzuki",
    categoryName: "Maruti Suzuki",
    model: "Maruti Suzuki Eeco",
    subtitle: "maruti-suzuki-eeco",
    handle: "maruti-suzuki-eeco",
    description: "The Maruti Suzuki Eeco is a no-frills people mover and light commercial vehicle that serves millions of Indian families and small businesses. Available in 5 and 7-seat configurations with an optional ambulance variant, the Eeco's near-flat floor and tall roof provide exceptional practicality. CNG versions are popular for fleet use.",
    variants: [
      { label: "Eeco 5-Seater Petrol", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 500000 },
      { label: "Eeco 7-Seater Petrol", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 540000 },
      { label: "Eeco 5-Seater CNG", fuelType: "CNG", transmission: "Manual", exShowroomINR: 600000 },
    ],
    images: marutiEeco,
    metadata: {
      features: hatchbackFeatures({ ac: "yes", powerWindows: "no" }),
      specifications: buildSpecs({
        engineType: "G12B, 1.2L MPFI", displacement: "1196", power: "73 PS @6000 rpm", torque: "101 Nm @3000 rpm",
        transmission: "Manual", gears: "5",
        length: "3675", width: "1475", height: "1825", wheelbase: "2350", groundClearance: "180", kerbWeight: "885",
        mileage: "16.11", seating: "5/7", fuelTank: "35",
        frontBrakes: "Disc", rearBrakes: "Drum", tyres: "155 R13 8PR",
      }),
    },
  },

  {
    brand: "Maruti Suzuki",
    categoryName: "Maruti Suzuki",
    model: "Maruti Suzuki Ertiga",
    subtitle: "maruti-suzuki-ertiga",
    handle: "maruti-suzuki-ertiga",
    description: "The Maruti Suzuki Ertiga is India's most popular multi-purpose vehicle (MPV), offering 7-seat comfort at a family-friendly price. The HEARTECT platform gives it a contemporary feel, while the K15B Smart Hybrid engine ensures frugal running costs. Versatile seating and a large boot make it the go-to family MPV.",
    variants: [
      { label: "Ertiga LXi", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 860000 },
      { label: "Ertiga VXi", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 980000 },
      { label: "Ertiga ZXi AT", fuelType: "Petrol", transmission: "Automatic", exShowroomINR: 1130000 },
      { label: "Ertiga VXi CNG", fuelType: "CNG", transmission: "Manual", exShowroomINR: 1010000 },
    ],
    images: marutiErtiga,
    metadata: {
      features: suvFeatures({ abs: "yes", airbags: "yes", awd: "no", sunroof: "no" }),
      specifications: buildSpecs({
        engineType: "K15B, 1.5L Smart Hybrid", displacement: "1462", power: "105 PS @6000 rpm", torque: "138 Nm @4400 rpm",
        transmission: "Manual / AT", gears: "5 / AT",
        length: "4395", width: "1735", height: "1690", wheelbase: "2740", groundClearance: "180", kerbWeight: "1175",
        mileage: "19.01", maxSpeed: "175", acceleration: "12.1",
        seating: "7", fuelTank: "45",
        frontBrakes: "Disc", rearBrakes: "Drum", tyres: "195/65 R15",
      }),
    },
  },

  {
    brand: "Maruti Suzuki",
    categoryName: "Maruti Suzuki",
    model: "Maruti Suzuki Grand Vitara",
    subtitle: "maruti-suzuki-grand-vitara",
    handle: "maruti-suzuki-grand-vitara",
    description: "The Maruti Suzuki Grand Vitara is a feature-packed compact SUV available with strong hybrid and mild hybrid powertrains. Its AllGrip Select AWD option makes it one of the few Maruti products with all-wheel drive. The spacious cabin, panoramic sunroof and ADAS safety features put it in direct competition with the Hyundai Creta and Kia Seltos.",
    variants: [
      { label: "Grand Vitara Sigma", fuelType: "Petrol (Mild Hybrid)", transmission: "Manual", exShowroomINR: 1067000 },
      { label: "Grand Vitara Zeta+", fuelType: "Petrol (Mild Hybrid)", transmission: "Automatic", exShowroomINR: 1395000 },
      { label: "Grand Vitara Alpha+ Strong Hybrid", fuelType: "Petrol (Strong Hybrid)", transmission: "E-CVT", exShowroomINR: 1764000 },
    ],
    images: marutiGrandVitara,
    metadata: {
      features: suvFeatures({ abs: "yes", airbags: "yes", awd: "yes", sunroof: "yes", touchscreen: "yes" }),
      specifications: buildSpecs({
        engineType: "K15C, 1.5L DualJet / Strong Hybrid", displacement: "1490", power: "103 PS @6000 rpm", torque: "137 Nm @4400 rpm",
        transmission: "Manual / AT / E-CVT", gears: "5 / AT / CVT",
        length: "4345", width: "1795", height: "1645", wheelbase: "2600", groundClearance: "210", kerbWeight: "1220",
        mileage: "27.97", maxSpeed: "180", acceleration: "10.5",
        seating: "5", fuelTank: "47",
        frontBrakes: "Disc", rearBrakes: "Disc", tyres: "215/60 R17",
      }),
    },
  },

  {
    brand: "Maruti Suzuki",
    categoryName: "Maruti Suzuki",
    model: "Maruti Suzuki Gypsy",
    subtitle: "maruti-suzuki-gypsy",
    handle: "maruti-suzuki-gypsy",
    description: "The Maruti Suzuki Gypsy is an iconic 4x4 off-road vehicle that served the Indian Army and police for decades. Its lightweight body-on-frame chassis and G13BB petrol engine make it supremely capable on rough terrain. The Gypsy has cult status among off-road enthusiasts and rally drivers across India.",
    variants: [
      { label: "Gypsy King HT", fuelType: "Petrol", transmission: "Manual 4WD", exShowroomINR: 620000 },
      { label: "Gypsy King ST", fuelType: "Petrol", transmission: "Manual 4WD", exShowroomINR: 680000 },
    ],
    images: marutiGypsy,
    metadata: {
      features: suvFeatures({ abs: "no", airbags: "no", awd: "yes" }),
      specifications: buildSpecs({
        engineType: "G13BB, 1.3L MPFI", displacement: "1298", power: "80 PS @6000 rpm", torque: "103 Nm @3000 rpm",
        transmission: "Manual 4WD", gears: "5",
        length: "3640", width: "1555", height: "1765", wheelbase: "2030", groundClearance: "210", kerbWeight: "1010",
        mileage: "11.5", maxSpeed: "140", acceleration: "16.0",
        seating: "4", fuelTank: "42",
        frontBrakes: "Disc", rearBrakes: "Drum", tyres: "205/70 R15",
      }),
    },
  },

  {
    brand: "Maruti Suzuki",
    categoryName: "Maruti Suzuki",
    model: "Maruti Suzuki Kizashi",
    subtitle: "maruti-suzuki-kizashi",
    handle: "maruti-suzuki-kizashi",
    description: "The Maruti Suzuki Kizashi was Maruti's ambitious foray into the premium mid-size sedan segment. Powered by a 2.4L petrol engine with CVT, it offered European driving dynamics and plush interiors rarely seen in a Maruti. Although discontinued, the Kizashi remains a distinctive and refined sedan sought by enthusiasts.",
    variants: [
      { label: "Kizashi CVT", fuelType: "Petrol", transmission: "Automatic (CVT)", exShowroomINR: 1600000 },
      { label: "Kizashi AWD CVT", fuelType: "Petrol", transmission: "Automatic CVT 4WD", exShowroomINR: 1800000 },
    ],
    images: marutiKizashi,
    metadata: {
      features: sedanFeatures({ abs: "yes", airbags: "yes", cruiseControl: "yes", sunroof: "yes" }),
      specifications: buildSpecs({
        engineType: "J24B, 2.4L DOHC 16V", displacement: "2393", power: "185 PS @7000 rpm", torque: "230 Nm @4000 rpm",
        transmission: "CVT / AWD CVT", gears: "CVT",
        length: "4650", width: "1820", height: "1455", wheelbase: "2700", groundClearance: "155", kerbWeight: "1520",
        mileage: "12.6", maxSpeed: "210", acceleration: "8.6",
        seating: "5", fuelTank: "61",
        frontBrakes: "Disc", rearBrakes: "Disc", tyres: "225/45 R18",
      }),
    },
  },

  {
    brand: "Maruti Suzuki",
    categoryName: "Maruti Suzuki",
    model: "Maruti Suzuki Omni",
    subtitle: "maruti-suzuki-omni",
    handle: "maruti-suzuki-omni",
    description: "The Maruti Suzuki Omni is a legendary rear-engine van that served Indian families and businesses for over three decades. Its practical boxy shape, low loading height and spacious interiors made it indispensable as a family mover, ambulance and commercial carrier. The Omni's simplicity and low cost of ownership made it a true workhorse.",
    variants: [
      { label: "Omni E 8-Seater", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 300000 },
      { label: "Omni E MPI BSIV CNG", fuelType: "CNG", transmission: "Manual", exShowroomINR: 360000 },
    ],
    images: marutiOmni,
    metadata: {
      features: hatchbackFeatures({ ac: "no", powerWindows: "no" }),
      specifications: buildSpecs({
        engineType: "796cc F8D Petrol / CNG", displacement: "796", power: "37 PS @5500 rpm", torque: "59 Nm @3000 rpm",
        transmission: "Manual", gears: "4",
        length: "3370", width: "1395", height: "1680", wheelbase: "1840", groundClearance: "170", kerbWeight: "745",
        mileage: "12.5", seating: "8", fuelTank: "27",
        frontBrakes: "Drum", rearBrakes: "Drum", tyres: "145/80 R12",
      }),
    },
  },

  {
    brand: "Maruti Suzuki",
    categoryName: "Maruti Suzuki",
    model: "Maruti Suzuki Ritz",
    subtitle: "maruti-suzuki-ritz",
    handle: "maruti-suzuki-ritz",
    description: "The Maruti Suzuki Ritz was a stylish tall hatchback positioned between the Swift and the WagonR. Its 1.2L K-Series petrol engine and optional 1.3L diesel gave it a versatile powertrain lineup. With a relatively large boot for its class and comfortable rear seats, the Ritz appealed to small-family buyers wanting more than a basic hatchback.",
    variants: [
      { label: "Ritz LXi", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 490000 },
      { label: "Ritz VXi", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 560000 },
      { label: "Ritz VDi", fuelType: "Diesel", transmission: "Manual", exShowroomINR: 620000 },
    ],
    images: marutiRitz,
    metadata: {
      features: hatchbackFeatures({ fogLights: "yes", abs: "yes", airbags: "yes", powerWindows: "yes" }),
      specifications: buildSpecs({
        engineType: "K12B, 1.2L VVT Petrol / 1.3L DDiS Diesel", displacement: "1197", power: "85 PS @6000 rpm", torque: "114 Nm @4200 rpm",
        transmission: "Manual", gears: "5",
        length: "3765", width: "1690", height: "1555", wheelbase: "2480", groundClearance: "175", kerbWeight: "940",
        mileage: "18.5", maxSpeed: "170", acceleration: "12.2",
        seating: "5", fuelTank: "43",
        frontBrakes: "Disc", rearBrakes: "Drum", tyres: "175/65 R14",
      }),
    },
  },

  {
    brand: "Maruti Suzuki",
    categoryName: "Maruti Suzuki",
    model: "Maruti Suzuki Swift",
    subtitle: "maruti-suzuki-swift",
    handle: "maruti-suzuki-swift",
    description: "The Maruti Suzuki Swift is one of India's most iconic and consistently best-selling hatchbacks. With sporty styling, a responsive K12N DualJet engine and a well-sorted suspension, the Swift is as fun to drive as it is practical. Available in manual and AMT variants, it has a passionate following among car enthusiasts and everyday commuters alike.",
    variants: [
      { label: "Swift LXi", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 576000 },
      { label: "Swift VXi", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 659000 },
      { label: "Swift ZXi", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 762000 },
      { label: "Swift ZXi AMT", fuelType: "Petrol", transmission: "Automatic (AMT)", exShowroomINR: 830000 },
      { label: "Swift VDi", fuelType: "Diesel", transmission: "Manual", exShowroomINR: 699000 },
    ],
    images: marutiSwift,
    metadata: {
      features: hatchbackFeatures({ alloyWheels: "yes", fogLights: "yes", abs: "yes", airbags: "yes", powerWindows: "yes" }),
      specifications: buildSpecs({
        engineType: "K12N DualJet VVT", displacement: "1197", power: "90 PS @6000 rpm", torque: "113 Nm @4400 rpm",
        transmission: "Manual / AMT", gears: "5 / AMT",
        length: "3845", width: "1735", height: "1530", wheelbase: "2450", groundClearance: "163", kerbWeight: "895",
        mileage: "23.20", maxSpeed: "180", acceleration: "11.0",
        seating: "5", fuelTank: "37",
        frontBrakes: "Disc", rearBrakes: "Drum", tyres: "185/65 R15",
      }),
    },
  },

  {
    brand: "Maruti Suzuki",
    categoryName: "Maruti Suzuki",
    model: "Maruti Suzuki Swift DZire",
    subtitle: "maruti-suzuki-swift-dzire",
    handle: "maruti-suzuki-swift-dzire",
    description: "The Maruti Suzuki Swift DZire (now called Dzire) is a compact sedan that combines the Swift's peppy nature with a well-proportioned three-box body. The spacious boot and comfortable rear seat make it ideal for families and as a cab. Available with a K12N petrol engine in manual and AMT options, the Dzire is one of India's top-selling sedans.",
    variants: [
      { label: "Dzire LXi", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 610000 },
      { label: "Dzire VXi", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 714000 },
      { label: "Dzire ZXi+", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 889000 },
      { label: "Dzire ZXi+ AMT", fuelType: "Petrol", transmission: "Automatic (AMT)", exShowroomINR: 960000 },
    ],
    images: marutiSwiftDzire,
    metadata: {
      features: sedanFeatures({ abs: "yes", airbags: "yes", touchscreen: "yes" }),
      specifications: buildSpecs({
        engineType: "K12N DualJet VVT", displacement: "1197", power: "90 PS @6000 rpm", torque: "113 Nm @4400 rpm",
        transmission: "Manual / AMT", gears: "5 / AMT",
        length: "3995", width: "1735", height: "1515", wheelbase: "2450", groundClearance: "163", kerbWeight: "910",
        mileage: "23.26", maxSpeed: "175", acceleration: "11.5",
        seating: "5", fuelTank: "37",
        frontBrakes: "Disc", rearBrakes: "Drum", tyres: "185/65 R15",
      }),
    },
  },

  {
    brand: "Maruti Suzuki",
    categoryName: "Maruti Suzuki",
    model: "Maruti Suzuki SX4",
    subtitle: "maruti-suzuki-sx4",
    handle: "maruti-suzuki-sx4",
    description: "The Maruti Suzuki SX4 was a European-designed mid-size sedan offering a wider, taller cabin than most rivals. Powered by either a 1.6L petrol or 1.3L DDiS diesel engine, it stood out with its muscular stance and chrome-accented grille. The SX4 gave Maruti its first foray into the segment above Ciaz's predecessor.",
    variants: [
      { label: "SX4 VXi Petrol", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 800000 },
      { label: "SX4 ZXi Petrol AT", fuelType: "Petrol", transmission: "Automatic", exShowroomINR: 900000 },
      { label: "SX4 VDi Diesel", fuelType: "Diesel", transmission: "Manual", exShowroomINR: 870000 },
    ],
    images: marutiSX4,
    metadata: {
      features: sedanFeatures({ abs: "yes", airbags: "yes" }),
      specifications: buildSpecs({
        engineType: "M16A, 1.6L VVT Petrol / DDiS Diesel", displacement: "1590", power: "107 PS @6000 rpm", torque: "144 Nm @4100 rpm",
        transmission: "Manual / AT", gears: "5 / AT",
        length: "4490", width: "1810", height: "1530", wheelbase: "2500", groundClearance: "170", kerbWeight: "1180",
        mileage: "14.0", maxSpeed: "185", acceleration: "10.8",
        seating: "5", fuelTank: "60",
        frontBrakes: "Disc", rearBrakes: "Drum", tyres: "215/55 R16",
      }),
    },
  },

  {
    brand: "Maruti Suzuki",
    categoryName: "Maruti Suzuki",
    model: "Maruti Suzuki Vitara Brezza",
    subtitle: "maruti-suzuki-vitara-brezza",
    handle: "maruti-suzuki-vitara-brezza",
    description: "The Maruti Suzuki Vitara Brezza is a compact SUV that dominated its segment for years after launch. Initially diesel-only, it later received a Smart Hybrid petrol engine that boosted fuel economy considerably. With its premium feature set, robust build quality and high ground clearance, the Brezza appeals to buyers wanting SUV looks and practicality.",
    variants: [
      { label: "Vitara Brezza LXi", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 776000 },
      { label: "Vitara Brezza ZXi", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 1056000 },
      { label: "Vitara Brezza ZXi AT", fuelType: "Petrol", transmission: "Automatic", exShowroomINR: 1140000 },
    ],
    images: marutiVitaraBreeza,
    metadata: {
      features: suvFeatures({ abs: "yes", airbags: "yes", sunroof: "no", touchscreen: "yes" }),
      specifications: buildSpecs({
        engineType: "K15B Smart Hybrid VVT", displacement: "1462", power: "105 PS @6000 rpm", torque: "138 Nm @4400 rpm",
        transmission: "Manual / AT", gears: "5 / AT",
        length: "3995", width: "1790", height: "1640", wheelbase: "2500", groundClearance: "198", kerbWeight: "1135",
        mileage: "17.03", maxSpeed: "175", acceleration: "12.0",
        seating: "5", fuelTank: "48",
        frontBrakes: "Disc", rearBrakes: "Disc", tyres: "215/60 R16",
      }),
    },
  },

  {
    brand: "Maruti Suzuki",
    categoryName: "Maruti Suzuki",
    model: "Maruti Suzuki Wagon R 1.0",
    subtitle: "maruti-suzuki-wagon-r",
    handle: "maruti-suzuki-wagon-r",
    description: "The Maruti Suzuki Wagon R is a consistently top-10 selling car in India, loved for its tall-boy design, spacious interior and practical flat floor. The K10C DualJet engine is available in both petrol and CNG. An AMT option makes it the perfect city runabout for buyers who want convenience without paying a premium for a conventional automatic.",
    variants: [
      { label: "Wagon R LXi", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 543000 },
      { label: "Wagon R VXi", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 589000 },
      { label: "Wagon R VXi AMT", fuelType: "Petrol", transmission: "Automatic (AMT)", exShowroomINR: 637000 },
      { label: "Wagon R VXi CNG", fuelType: "CNG", transmission: "Manual", exShowroomINR: 626000 },
    ],
    images: marutiWagonR,
    metadata: {
      features: hatchbackFeatures({ fogLights: "yes", abs: "yes", airbags: "yes", powerWindows: "yes" }),
      specifications: buildSpecs({
        engineType: "K10C DualJet VVT", displacement: "998", power: "68 PS @6500 rpm", torque: "89 Nm @3500 rpm",
        transmission: "Manual / AMT", gears: "5 / AMT",
        length: "3655", width: "1620", height: "1675", wheelbase: "2435", groundClearance: "170", kerbWeight: "835",
        mileage: "25.19", maxSpeed: "155", acceleration: "13.5",
        seating: "5", fuelTank: "32",
        frontBrakes: "Disc", rearBrakes: "Drum", tyres: "165/70 R14",
      }),
    },
  },

  {
    brand: "Maruti Suzuki",
    categoryName: "Maruti Suzuki",
    model: "Maruti Suzuki Zen Estilo",
    subtitle: "maruti-suzuki-zen-estilo",
    handle: "maruti-suzuki-zen-estilo",
    description: "The Maruti Suzuki Zen Estilo was a compact hatchback that replaced the original Zen with a rounder, more modern design. Powered by the F10D 1.0L petrol engine, it was frugal and easy to drive. The Estilo was popular as a style-focused alternative to the Alto in its segment, and is fondly remembered as a city car of the mid-2000s.",
    variants: [
      { label: "Zen Estilo LXi", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 360000 },
      { label: "Zen Estilo VXi", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 410000 },
    ],
    images: marutiZenEstilo,
    metadata: {
      features: hatchbackFeatures({ powerWindows: "yes" }),
      specifications: buildSpecs({
        engineType: "F10D, 996cc", displacement: "996", power: "65 PS @6000 rpm", torque: "84 Nm @3500 rpm",
        transmission: "Manual", gears: "5",
        length: "3450", width: "1575", height: "1490", wheelbase: "2360", groundClearance: "155", kerbWeight: "780",
        mileage: "18.7", maxSpeed: "145", acceleration: "15.5",
        seating: "5", fuelTank: "35",
        frontBrakes: "Disc", rearBrakes: "Drum", tyres: "155/65 R13",
      }),
    },
  },

  // ════════════════════════════════════════════════════════════════════════════
  // MAZDA
  // ════════════════════════════════════════════════════════════════════════════

  {
    brand: "Mazda",
    categoryName: "Mazda",
    model: "Mazda 2",
    subtitle: "mazda-2",
    handle: "mazda-2",
    description: "The Mazda 2 (Demio) is a subcompact hatchback and sedan that embodies Mazda's KODO soul of motion design philosophy. Its naturally aspirated SkyActiv-G 1.5L petrol engine is renowned for smoothness and efficiency. The 2 offers a driving experience far superior to its size, with sharp handling and a premium interior quality that punches well above its price.",
    variants: [
      { label: "Mazda 2 SkyActiv-G 1.3", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 750000 },
      { label: "Mazda 2 SkyActiv-G 1.5 AT", fuelType: "Petrol", transmission: "Automatic", exShowroomINR: 900000 },
    ],
    images: mazda2Images,
    metadata: {
      features: hatchbackFeatures({ alloyWheels: "yes", fogLights: "yes", abs: "yes", airbags: "yes", powerWindows: "yes" }),
      specifications: buildSpecs({
        engineType: "SkyActiv-G 1.5L DOHC 16V", displacement: "1496", power: "115 PS @6000 rpm", torque: "148 Nm @4000 rpm",
        transmission: "Manual / 6-AT", gears: "6 / AT",
        length: "4065", width: "1695", height: "1500", wheelbase: "2570", groundClearance: "155", kerbWeight: "1025",
        mileage: "18.3", maxSpeed: "185", acceleration: "10.3",
        seating: "5", fuelTank: "44",
        frontBrakes: "Disc", rearBrakes: "Drum", tyres: "185/55 R16",
      }),
    },
  },

  {
    brand: "Mazda",
    categoryName: "Mazda",
    model: "Mazda 3",
    subtitle: "mazda-3",
    handle: "mazda-3",
    description: "The Mazda 3 is a compact car available in sedan and hatchback body styles, consistently praised for its driver-centric dynamics and premium feel. The SkyActiv-X 2.0L engine uses Spark Controlled Compression Ignition for outstanding efficiency. Inside, Mazda's minimalist dashboard and high-quality materials rival cars costing considerably more.",
    variants: [
      { label: "Mazda 3 SkyActiv-G 2.0 Sedan", fuelType: "Petrol", transmission: "Automatic", exShowroomINR: 2300000 },
      { label: "Mazda 3 SkyActiv-X 2.0 Hatchback", fuelType: "Petrol (SPCCI)", transmission: "Automatic", exShowroomINR: 2700000 },
    ],
    images: mazda3Images,
    metadata: {
      features: sedanFeatures({ abs: "yes", airbags: "yes", cruiseControl: "yes", touchscreen: "yes", sunroof: "yes" }),
      specifications: buildSpecs({
        engineType: "SkyActiv-X 2.0L SPCCI / SkyActiv-G 2.0L", displacement: "1998", power: "182 PS @6000 rpm", torque: "224 Nm @4000 rpm",
        transmission: "6-AT", gears: "AT",
        length: "4662", width: "1797", height: "1440", wheelbase: "2726", groundClearance: "150", kerbWeight: "1375",
        mileage: "15.8", maxSpeed: "215", acceleration: "7.9",
        seating: "5", fuelTank: "51",
        frontBrakes: "Disc", rearBrakes: "Disc", tyres: "215/45 R18",
      }),
    },
  },

  // ════════════════════════════════════════════════════════════════════════════
  // NISSAN
  // ════════════════════════════════════════════════════════════════════════════

  {
    brand: "Nissan",
    categoryName: "Nissan",
    model: "Nissan 370Z",
    subtitle: "nissan-370z",
    handle: "nissan-370z",
    description: "The Nissan 370Z is a legendary sports car powered by a 3.7L V6 naturally aspirated engine producing 332 PS. With its rear-wheel-drive layout and short wheelbase, the 370Z delivers pure, unfiltered driving pleasure. Synchro Rev Match technology automatically blips the throttle on downshifts for heel-and-toe perfection without effort.",
    variants: [
      { label: "370Z Roadster Manual", fuelType: "Petrol", transmission: "6-Speed Manual", exShowroomINR: 7200000 },
      { label: "370Z Coupe AT", fuelType: "Petrol", transmission: "7-Speed Automatic", exShowroomINR: 6500000 },
    ],
    images: nissan370ZImages,
    metadata: {
      features: {
        "Safety & Security": [
          { key: "ABS + EBD", value: "yes" },
          { key: "Vehicle Dynamic Control (VDC)", value: "yes" },
          { key: "Driver & Passenger Airbags", value: "yes" },
          { key: "Side & Curtain Airbags", value: "yes" },
          { key: "Traction Control", value: "yes" },
        ],
        "Comfort & Convenience": [
          { key: "Dual-Zone Automatic Climate Control", value: "yes" },
          { key: "Cruise Control", value: "yes" },
          { key: "Push-Button Start", value: "yes" },
          { key: "Power Windows", value: "yes" },
          { key: "Rear-View Camera", value: "yes" },
        ],
        "Exterior": [
          { key: "19-inch Forged Aluminium Wheels", value: "yes" },
          { key: "Xenon Headlamps", value: "yes" },
          { key: "LED Taillamps", value: "yes" },
          { key: "Active Front Spoiler", value: "no" },
          { key: "Sports Exhaust", value: "yes" },
        ],
        "Interior": [
          { key: "7-inch Touchscreen", value: "yes" },
          { key: "Bose Premium Audio (9 speakers)", value: "yes" },
          { key: "Leather & Alcantara Seats", value: "yes" },
          { key: "Heated Seats", value: "yes" },
          { key: "Synchro Rev Match", value: "yes" },
        ],
      },
      specifications: buildSpecs({
        engineType: "VQ37VHR V6 DOHC 24V", displacement: "3696", power: "332 PS @7000 rpm", torque: "363 Nm @5200 rpm",
        transmission: "6-MT / 7-AT", gears: "6 / 7",
        length: "4250", width: "1845", height: "1315", wheelbase: "2550", groundClearance: "110", kerbWeight: "1496",
        mileage: "9.0", maxSpeed: "250", acceleration: "5.3",
        seating: "2+2", fuelTank: "72",
        frontBrakes: "Disc (Brembo)", rearBrakes: "Disc (Brembo)", tyres: "225/40 ZR19 (F) / 245/40 ZR19 (R)",
      }),
    },
  },

  {
    brand: "Nissan",
    categoryName: "Nissan",
    model: "Nissan Micra",
    subtitle: "nissan-micra",
    handle: "nissan-micra",
    description: "The Nissan Micra is a stylish and modern hatchback that blends funky European design with practical engineering. Its 1.2L petrol engine delivers lively urban performance, while the CVT option makes stop-and-go traffic stress-free. The Micra's distinctive pod cluster and wraparound dashboard create a unique interior environment unlike any competitor.",
    variants: [
      { label: "Micra XE Petrol", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 510000 },
      { label: "Micra XV Petrol CVT", fuelType: "Petrol", transmission: "Automatic (CVT)", exShowroomINR: 650000 },
      { label: "Micra XV Diesel", fuelType: "Diesel", transmission: "Manual", exShowroomINR: 630000 },
    ],
    images: nissanMicraImages,
    metadata: {
      features: hatchbackFeatures({ alloyWheels: "yes", fogLights: "yes", abs: "yes", airbags: "yes", powerWindows: "yes" }),
      specifications: buildSpecs({
        engineType: "HR12DE, 1.2L DOHC 3-cyl", displacement: "1198", power: "76 PS @6000 rpm", torque: "104 Nm @4000 rpm",
        transmission: "5-MT / CVT", gears: "5 / CVT",
        length: "3780", width: "1660", height: "1525", wheelbase: "2450", groundClearance: "165", kerbWeight: "940",
        mileage: "19.0", maxSpeed: "160", acceleration: "13.2",
        seating: "5", fuelTank: "41",
        frontBrakes: "Disc", rearBrakes: "Drum", tyres: "175/65 R15",
      }),
    },
  },

  {
    brand: "Nissan",
    categoryName: "Nissan",
    model: "Nissan Sunny",
    subtitle: "nissan-sunny",
    handle: "nissan-sunny",
    description: "The Nissan Sunny is a value-focused compact sedan that offers a spacious cabin and large boot for its segment. Its HR12DE petrol engine and K9K diesel engine cater to both economy-focused and performance-oriented buyers. The Sunny stood out with its generous rear legroom — a priority for Indian family buyers and cab operators alike.",
    variants: [
      { label: "Sunny XE Petrol", fuelType: "Petrol", transmission: "Manual", exShowroomINR: 710000 },
      { label: "Sunny XV CVT", fuelType: "Petrol", transmission: "Automatic (CVT)", exShowroomINR: 870000 },
      { label: "Sunny XL Diesel", fuelType: "Diesel", transmission: "Manual", exShowroomINR: 880000 },
    ],
    images: nissanSunnyImages,
    metadata: {
      features: sedanFeatures({ abs: "yes", airbags: "yes" }),
      specifications: buildSpecs({
        engineType: "HR12DE, 1.2L / K9K 1.5L dCi Diesel", displacement: "1198", power: "81 PS @6000 rpm", torque: "108 Nm @4000 rpm",
        transmission: "5-MT / CVT", gears: "5 / CVT",
        length: "4425", width: "1695", height: "1505", wheelbase: "2600", groundClearance: "165", kerbWeight: "1060",
        mileage: "19.5", maxSpeed: "172", acceleration: "12.5",
        seating: "5", fuelTank: "42",
        frontBrakes: "Disc", rearBrakes: "Drum", tyres: "185/65 R15",
      }),
    },
  },

  {
    brand: "Nissan",
    categoryName: "Nissan",
    model: "Nissan Teana",
    subtitle: "nissan-teana",
    handle: "nissan-teana",
    description: "The Nissan Teana is a premium mid-size sedan that competes against the Toyota Camry and Honda Accord. Its 2.5L V6 engine provides smooth, effortless power, while the Xtronic CVT ensures seamless acceleration. The Teana's Wide Comfort cockpit concept prioritises the rear-seat passenger experience with its sumptuous leather seats and generous legroom.",
    variants: [
      { label: "Teana 2.5L CVT", fuelType: "Petrol", transmission: "Automatic (CVT)", exShowroomINR: 2400000 },
    ],
    images: nissanTeanaImages,
    metadata: {
      features: sedanFeatures({ abs: "yes", airbags: "yes", cruiseControl: "yes", touchscreen: "yes", sunroof: "yes" }),
      specifications: buildSpecs({
        engineType: "QR25DE, 2.5L DOHC V6", displacement: "2499", power: "182 PS @6000 rpm", torque: "233 Nm @4400 rpm",
        transmission: "Xtronic CVT", gears: "CVT",
        length: "4855", width: "1830", height: "1490", wheelbase: "2775", groundClearance: "155", kerbWeight: "1530",
        mileage: "12.4", maxSpeed: "210", acceleration: "8.5",
        seating: "5", fuelTank: "70",
        frontBrakes: "Disc", rearBrakes: "Disc", tyres: "215/55 R17",
      }),
    },
  },

  {
    brand: "Nissan",
    categoryName: "Nissan",
    model: "Nissan X-Trail",
    subtitle: "nissan-x-trail",
    handle: "nissan-x-trail",
    description: "The Nissan X-Trail is a capable compact SUV available with All-Mode 4x4-i intelligent all-wheel drive. Its 2.5L petrol engine and e-Pedal one-pedal driving technology (in hybrid variants) make it a versatile family SUV. The X-Trail's panoramic sunroof, 7-seat option and floating roof design give it a premium presence in its segment.",
    variants: [
      { label: "X-Trail 2.0L 2WD CVT", fuelType: "Petrol", transmission: "Automatic (CVT)", exShowroomINR: 2600000 },
      { label: "X-Trail 2.5L AWD CVT", fuelType: "Petrol", transmission: "Automatic (CVT) 4WD", exShowroomINR: 3100000 },
    ],
    images: nissanXTrailImages,
    metadata: {
      features: suvFeatures({ abs: "yes", airbags: "yes", awd: "yes", sunroof: "yes", touchscreen: "yes" }),
      specifications: buildSpecs({
        engineType: "MR20DD, 2.0L / QR25DE 2.5L", displacement: "1997", power: "144 PS @6000 rpm", torque: "200 Nm @4400 rpm",
        transmission: "Xtronic CVT / AWD CVT", gears: "CVT",
        length: "4680", width: "1840", height: "1720", wheelbase: "2706", groundClearance: "215", kerbWeight: "1530",
        mileage: "13.5", maxSpeed: "190", acceleration: "10.5",
        seating: "5/7", fuelTank: "65",
        frontBrakes: "Disc", rearBrakes: "Disc", tyres: "225/60 R18",
      }),
    },
  },

  // ════════════════════════════════════════════════════════════════════════════
  // VOLVO
  // ════════════════════════════════════════════════════════════════════════════

  {
    brand: "Volvo",
    categoryName: "Volvo",
    model: "Volvo S60",
    subtitle: "volvo-s60",
    handle: "volvo-s60",
    description: "The Volvo S60 is a compact executive sedan that offers a compelling alternative to the German trio of BMW 3 Series, Mercedes C-Class and Audi A4. Built on Volvo's SPA scalable product architecture, it shares its underpinnings with the XC60. The S60's Clean Zone interior with no diesel option reinforces Volvo's commitment to in-cabin air quality and sustainability.",
    variants: [
      { label: "S60 T5 Momentum (2WD)", fuelType: "Petrol (Mild Hybrid)", transmission: "8-Speed Automatic", exShowroomINR: 4600000 },
      { label: "S60 T8 R-Design (AWD PHEV)", fuelType: "Petrol Plug-in Hybrid", transmission: "8-Speed Automatic", exShowroomINR: 6200000 },
    ],
    images: volvoS60Images,
    metadata: {
      features: luxuryFeatures(),
      specifications: buildSpecs({
        engineType: "B5254T12, 2.0L T5 Turbo / T8 PHEV", displacement: "1969", power: "250 PS @5500 rpm", torque: "350 Nm @1500 rpm",
        transmission: "8-AT / 8-AT AWD", gears: "8-AT",
        length: "4762", width: "1850", height: "1431", wheelbase: "2872", groundClearance: "127", kerbWeight: "1695",
        mileage: "16.0", maxSpeed: "230", acceleration: "6.5",
        seating: "5", fuelTank: "60",
        frontBrakes: "Disc (ventilated)", rearBrakes: "Disc", tyres: "235/45 R18",
      }),
    },
  },

  {
    brand: "Volvo",
    categoryName: "Volvo",
    model: "Volvo S80",
    subtitle: "volvo-s80",
    handle: "volvo-s80",
    description: "The Volvo S80 was Volvo's flagship executive sedan, offering spacious rear accommodation and a refined ride befitting a luxury car. Its longitudinally mounted 3.2L inline-six and T6 twin-turbocharged engines delivered smooth, effortless performance. The S80 featured Volvo's pioneering City Safety autonomous emergency braking system, making it one of the safest cars available.",
    variants: [
      { label: "S80 T4 Summum", fuelType: "Petrol", transmission: "6-Speed Automatic", exShowroomINR: 4800000 },
      { label: "S80 D5 AWD Executive", fuelType: "Diesel", transmission: "6-Speed Automatic", exShowroomINR: 5500000 },
    ],
    images: volvoS80Images,
    metadata: {
      features: luxuryFeatures(),
      specifications: buildSpecs({
        engineType: "B6324S2, 3.2L I6 / D5 2.4L 5-cyl Turbo Diesel", displacement: "3192", power: "243 PS @6200 rpm", torque: "320 Nm @3200 rpm",
        transmission: "6-AT", gears: "6-AT",
        length: "4851", width: "1861", height: "1484", wheelbase: "2835", groundClearance: "140", kerbWeight: "1738",
        mileage: "10.5", maxSpeed: "230", acceleration: "7.0",
        seating: "5", fuelTank: "70",
        frontBrakes: "Disc (ventilated)", rearBrakes: "Disc", tyres: "235/50 R18",
      }),
    },
  },

  {
    brand: "Volvo",
    categoryName: "Volvo",
    model: "Volvo XC60",
    subtitle: "volvo-xc60",
    handle: "volvo-xc60",
    description: "The Volvo XC60 is a mid-size luxury SUV and one of the world's safest vehicles, having scored 5 stars in Euro NCAP with a near-perfect adult occupant protection score. The T8 Twin Engine plug-in hybrid variant delivers supercar performance with SUV practicality. Its Scandinavian minimalist interior with the 9-inch Sensus touchscreen remains a benchmark in the segment.",
    variants: [
      { label: "XC60 B5 Momentum (AWD)", fuelType: "Petrol (Mild Hybrid)", transmission: "8-Speed Automatic", exShowroomINR: 6395000 },
      { label: "XC60 B6 R-Design (AWD)", fuelType: "Petrol (Mild Hybrid)", transmission: "8-Speed Automatic", exShowroomINR: 7400000 },
      { label: "XC60 T8 Recharge (AWD PHEV)", fuelType: "Petrol Plug-in Hybrid", transmission: "8-Speed Automatic", exShowroomINR: 8900000 },
    ],
    images: volvoXC60Images,
    metadata: {
      features: luxuryFeatures(),
      specifications: buildSpecs({
        engineType: "B5204T23, 2.0L T8 Twin Engine PHEV", displacement: "1969", power: "390 PS @5700 rpm", torque: "640 Nm @2200 rpm",
        transmission: "8-AT AWD", gears: "8-AT",
        length: "4688", width: "1902", height: "1658", wheelbase: "2865", groundClearance: "212", kerbWeight: "2095",
        mileage: "45.0", maxSpeed: "230", acceleration: "5.3",
        seating: "5", fuelTank: "71",
        frontBrakes: "Disc (Brembo ventilated)", rearBrakes: "Disc", tyres: "235/55 R19",
      }),
    },
  },

  {
    brand: "Volvo",
    categoryName: "Volvo",
    model: "Volvo XC90",
    subtitle: "volvo-xc90",
    handle: "volvo-xc90",
    description: "The Volvo XC90 is a flagship 7-seat luxury SUV that won the prestigious World Car of the Year award in 2016. Built on SPA architecture, it uses a family of 2.0L engines (B5, B6, T8 PHEV) to cover every power level. The XC90's four-zone climate, Bowers & Wilkins 19-speaker sound system and 7 airbags set new benchmarks for the large luxury SUV segment.",
    variants: [
      { label: "XC90 B5 Momentum (AWD)", fuelType: "Petrol (Mild Hybrid)", transmission: "8-Speed Automatic", exShowroomINR: 9290000 },
      { label: "XC90 B6 R-Design (AWD)", fuelType: "Petrol (Mild Hybrid)", transmission: "8-Speed Automatic", exShowroomINR: 10400000 },
      { label: "XC90 T8 Recharge Excellence (AWD PHEV)", fuelType: "Petrol Plug-in Hybrid", transmission: "8-Speed Automatic", exShowroomINR: 13600000 },
    ],
    images: volvoXC90Images,
    metadata: {
      features: luxuryFeatures(),
      specifications: buildSpecs({
        engineType: "B5254T11, 2.0L T8 Twin Engine PHEV", displacement: "1969", power: "407 PS @5700 rpm", torque: "640 Nm @2200 rpm",
        transmission: "8-AT AWD", gears: "8-AT",
        length: "4963", width: "2008", height: "1776", wheelbase: "2984", groundClearance: "235", kerbWeight: "2279",
        mileage: "40.0", maxSpeed: "230", acceleration: "5.6",
        seating: "7", fuelTank: "71",
        frontBrakes: "Disc (ventilated)", rearBrakes: "Disc", tyres: "255/50 R20",
      }),
    },
  },
]
