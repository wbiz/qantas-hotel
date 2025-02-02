import Image from 'next/image'

export default function HotelImage({
  url,
  caption,
  promotion,
}: {
  url: string
  caption?: string
  promotion?: string
}) {
  if (!url) return null
  return (
    <div className="relative my-2 w-full h-full sm:w-[145px] sm:h-[125px]">
      <Image
        src={url}
        alt={caption || 'hotel image'}
        layout="intrinsic"
        width={145}
        height={125}
        className="w-full max-h-[200px] object-cover sm:w-[145px] sm:h-[125px]"
      />
      {promotion ? (
        <div className="absolute top-2 bg-white text-[red] text-xs font-bold px-2 py-1">
          {promotion}
        </div>
      ) : null}
    </div>
  )
}
