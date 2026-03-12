"use client"

import Slider from "react-slick"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export type BrandLogoItem = {
  name: string
  src: string
}

export default function BrandLogoSlider({
  items,
}: {
  items: BrandLogoItem[]
}) {
  if (!items?.length) return null

  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    autoplay: true,
    pauseOnHover: false,
    swipeToSlide: true,
    draggable: true,
    slidesToScroll: 1,
    slidesToShow: 7,
    speed: 6000,
    autoplaySpeed: 0,
    cssEase: "linear",
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 5 } },
      { breakpoint: 768, settings: { slidesToShow: 4 } },
      { breakpoint: 520, settings: { slidesToShow: 3 } },
    ],
  } as const

  return (
    <div className="brand-slick w-full">
      <Slider {...(settings as any)}>
        {items.map((b) => (
          <div key={`${b.name}-${b.src}`} className="px-2 md:px-3 lg:px-6 xl:px-8">
            <LocalizedClientLink
              href={`/cars?brand=${encodeURIComponent(b.name)}`}
              className="group block"
              aria-label={`${b.name} cars`}
              title={b.name}
            >
              <div className="h-14 md:h-16 lg:h-16 rounded-2xl bg-transparent border-0 flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full p-3 md:p-4 lg:p-4 transition-transform duration-300 ease-out scale-90 group-hover:scale-100 origin-center">
                  <Image
                    src={b.src}
                    alt={`${b.name} logo`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 56px, 64px"
                  />
                </div>
              </div>
              <p className="mt-2 text-center text-xs font-semibold tracking-wide text-slate-600 transition-colors duration-300 uppercase line-clamp-1">
                {b.name}
              </p>
            </LocalizedClientLink>
          </div>
        ))}
      </Slider>
    </div>
  )
}

