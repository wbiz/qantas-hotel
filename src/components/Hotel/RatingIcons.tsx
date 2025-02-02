import { RatingIconType, WithKeyProps } from '@/types/types'

const DEFAULT_SIZE = 15
const FILLED_BG_COLOR = 'bg-yellow-200'
const EMPTY_BG_COLOR = 'bg-gray-300'
const FILLED_COLOR = 'fill-yellow-200'
const EMPTY_COLOR = 'fill-gray-300'
export const Circle = ({
  type = 'filled',
  size = DEFAULT_SIZE,
}: { type: RatingIconType; size?: number } & WithKeyProps) => {
  const leftColor = type === 'empty' ? EMPTY_BG_COLOR : FILLED_BG_COLOR
  const rightColor = type === 'filled' ? FILLED_BG_COLOR : EMPTY_BG_COLOR
  const safeSize = size || DEFAULT_SIZE

  return (
    <div
      className="relative rounded-full overflow-hidden"
      style={{ width: `${safeSize}px`, height: `${safeSize}px` }}
    >
      <div className={`absolute left-0 top-0 w-1/2 h-full ${leftColor}`}></div>
      <div
        className={`absolute right-0 top-0 w-1/2 h-full ${rightColor}`}
      ></div>
    </div>
  )
}

export const Star = ({
  type = 'filled',
  size = DEFAULT_SIZE,
}: { type: RatingIconType; size?: number } & WithKeyProps) => {
  const leftColor = type === 'empty' ? EMPTY_COLOR : FILLED_COLOR
  const rightColor = type === 'filled' ? FILLED_COLOR : EMPTY_COLOR
  const safeSize = size || DEFAULT_SIZE

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={safeSize}
      height={safeSize}
    >
      <polygon
        points="50,10 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35"
        className={leftColor}
      />
      <polygon
        points="50,10 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35"
        className={rightColor}
        clipPath="url(#clipPath)"
      />
      <defs>
        <clipPath id="clipPath">
          <rect x="50" y="0" width="50" height="100" />
        </clipPath>
      </defs>
    </svg>
  )
}
