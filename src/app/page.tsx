import HotelList from '@/components/Hotel/HotelList'
import { fetchHotels } from '@/lib/hotelService'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  let sort = (await searchParams)?.sort
  if (Array.isArray(sort)) {
    sort = sort[0]
  }

  let hotels = []
  try {
    hotels = await fetchHotels(sort)
  } catch (e) {
    console.error(e)
    return <div>Something went wrong</div>
  }

  return (
    <div className="my-6">
      <HotelList hotels={hotels} />
    </div>
  )
}
