import { RatingIconType } from '@/types/types'

export const getRatingStyles = (rating: number): RatingIconType[] => {
  if (isNaN(rating) || rating < 0) {
    return ['empty', 'empty', 'empty', 'empty', 'empty'];
  }
  if(rating >= 5) {
    return ['filled', 'filled', 'filled', 'filled', 'filled'];
  }
  const highR = Math.ceil(rating)
  return Array.from({ length: 5 }, (_, i) => {
    const ratingValue = i + 1
    if (ratingValue <= rating) return 'filled'
    if (ratingValue > highR) return 'empty'
    return 'half'
  })
}
