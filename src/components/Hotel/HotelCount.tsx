const HotelCount = ({
  count,
  location = 'Sydney',
}: {
  count: number
  location?: string
}) => (
  <>
    <span>{count}</span>
    <span className="text-[gray] italic"> hotels in </span>
    <span className="font-semibold">{location}.</span>
  </>
)

export default HotelCount
