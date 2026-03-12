declare module "react-slick" {
  import { ComponentType } from "react"
  export interface Settings {
    dots?: boolean
    arrows?: boolean
    infinite?: boolean
    speed?: number
    fade?: boolean
    autoplay?: boolean
    autoplaySpeed?: number
    pauseOnHover?: boolean
    cssEase?: string
    slidesToShow?: number
    slidesToScroll?: number
    [key: string]: unknown
  }
  const Slider: ComponentType<Settings & { children?: React.ReactNode }>
  export default Slider
}
