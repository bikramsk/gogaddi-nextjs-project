import { redirect } from "next/navigation"

// /store is now /cars in the GoGaddi marketplace
export default async function StorePage(props: {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<Record<string, string>>
}) {
  const params = await props.params
  const searchParams = await props.searchParams
  const qs = new URLSearchParams(searchParams).toString()
  redirect(`/${params.countryCode}/cars${qs ? `?${qs}` : ""}`)
}
