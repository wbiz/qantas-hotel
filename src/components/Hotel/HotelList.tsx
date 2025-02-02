import HotelCard from '@/components/Hotel/HotelCard'
import HotelCount from '@/components/Hotel/HotelCount'
import Sort from '@/components/Hotel/Sort'
import { HotelDecoratorType } from '@/types/types.ts'

export default async function HotelList({
  hotels,
}: {
  hotels: HotelDecoratorType[]
}) {
  return (
    <>
      <div className="flex">
        <div className="mb-2 flex-grow">
          <HotelCount count={hotels.length} />
        </div>
        <Sort />
      </div>
      {hotels.map((hotel: HotelDecoratorType) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </>
  )
}
