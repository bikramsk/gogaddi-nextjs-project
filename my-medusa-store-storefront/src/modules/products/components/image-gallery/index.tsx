import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import { PLACEHOLDER_IMAGE_URL } from "@lib/constants/placeholder-image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const list = Array.isArray(images) && images.length > 0
    ? images
    : ([{ id: "placeholder", url: PLACEHOLDER_IMAGE_URL }] as HttpTypes.StoreProductImage[])

  return (
    <div className="flex items-start relative">
      <div className="flex flex-col flex-1 small:mx-16 gap-y-4">
        {list.map((image, index) => {
          const src = image.url || PLACEHOLDER_IMAGE_URL
          return (
            <Container
              key={image.id ?? index}
              className="relative aspect-[29/34] w-full overflow-hidden bg-ui-bg-subtle"
              id={image.id ?? `img-${index}`}
            >
              <Image
                  src={src}
                  priority={index <= 2 ? true : false}
                  className="absolute inset-0 rounded-rounded"
                  alt={`Product image ${index + 1}`}
                  fill
                  sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                  style={{
                    objectFit: "cover",
                  }}
                />
            </Container>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
