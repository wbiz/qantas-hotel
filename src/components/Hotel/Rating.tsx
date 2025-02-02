import { RatingType } from '@/types/types'
import { getRatingStyles } from '@/lib/utils'
import { Circle, Star } from '@/components/Hotel/RatingIcons'

export const Rating = ({
  rating,
  type = 'self',
}: {
  rating: number
  type: RatingType
}) => {
  const ratingStyles = getRatingStyles(rating)
  const Comp = type === 'self' ? Circle : Star

  return (
    <div className="flex gap-[2]">
      {ratingStyles.map((style, i) => {
        return <Comp key={`full-${i}`} type={style} />
      })}
    </div>
  )
}
