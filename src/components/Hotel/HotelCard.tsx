import { HotelDecoratorType, WithKeyProps } from '@/types/types'
import { Rating } from '@/components/Hotel/Rating'
import HotelImage from '@/components/Hotel/HotelImage'

type HotelCardProps = {
  hotel: HotelDecoratorType
}
export default function HotelCard({
  hotel: {
    imageUrl,
    property: { previewImage, title, rating },
    offer: { promotion, name },
    fullAddress,
    priceLabel,
    amount,
    isFreeCancellation,
    saving,
  },
}: HotelCardProps & WithKeyProps) {
  return (
    <div className="flex flex-col items-center w-full sm:flex-row sm:items-start gap-4 ">
      {previewImage?.url ? (
        <HotelImage
          url={imageUrl}
          caption={previewImage?.caption}
          promotion={promotion?.title}
        />
      ) : null}
      <div className="border-t flex flex-grow w-full sm:w-auto">
        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row sm:items-center gap-[5px]">
            {title ? (
              <h2
                title={title}
                className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[280px] text-[1.2rem]"
              >
                {title}
              </h2>
            ) : null}

            {rating?.ratingValue ? (
              <Rating rating={rating.ratingValue} type={rating.ratingType} />
            ) : null}
          </div>
          <div className="text-[0.8rem] text-[gray]">{fullAddress}</div>
          <div className="flex">
            <div className="flex-grow">
              <div className="text-[red] text-[0.9rem] mt-2">{name}</div>
              {isFreeCancellation ? (
                <div className="text-[0.8rem] text-[green] mt-5">
                  Free Cancellation
                </div>
              ) : null}
            </div>

            <div className="items-end flex flex-col">
              <div className="text-[0.7rem] text-[gray]">{priceLabel}</div>
              <div className="text-[1.5rem]">
                <span className="align-text-top text-[0.9rem]">$</span>
                {amount}
              </div>
              {saving && saving > 0 ? (
                <div className="text-[red] align-text-bottom">
                  Save ${saving}
                  <span className="align-text-bottom">~</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
