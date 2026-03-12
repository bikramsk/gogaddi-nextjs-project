import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="content-container pt-4 pb-2">
        <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li>
              <LocalizedClientLink href="/" className="text-blue-600 hover:underline">
                Home
              </LocalizedClientLink>
            </li>
            <li aria-hidden>/</li>
            <li>
              <LocalizedClientLink href="/cars" className="text-blue-600 hover:underline">
                Cars
              </LocalizedClientLink>
            </li>
            <li aria-hidden>/</li>
            <li className="text-gray-700 font-medium truncate max-w-[180px]" aria-current="page">
              {product.title}
            </li>
          </ol>
        </nav>
      </div>

      <div
        className="content-container flex flex-col lg:flex-row gap-8 lg:gap-12 py-6 pb-10"
        data-testid="product-container"
      >
        {/* Gallery - prominent for car marketplace */}
        <div className="w-full lg:flex-1 min-w-0">
          <ImageGallery images={images} />
        </div>

        {/* Sidebar - info, tabs, actions */}
        <div className="w-full lg:max-w-[380px] flex flex-col gap-8">
          <ProductInfo product={product} />
          <ProductTabs product={product} />
          <ProductOnboardingCta />
          <Suspense
            fallback={
              <ProductActions disabled={true} product={product} region={region} />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
        </div>
      </div>

      {/* Related cars */}
      <div
        className="content-container my-16"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
