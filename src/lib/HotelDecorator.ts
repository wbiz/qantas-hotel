import { Hotel, HotelDecoratorType, Property, Offer } from '@/types/types'

export class HotelDecorator implements HotelDecoratorType {
  id: string
  property: Property
  offer: Offer

  constructor(private hotel: Hotel) {
    this.id = hotel.id
    this.property = hotel.property
    this.offer = hotel.offer

    return new Proxy(this, {
      get(target, prop) {
        // return it, if the requested property exists on the decorator
        if (prop in target) {
          return target[prop as keyof HotelDecorator]
        }
        // Otherwise, fallback to the original object
        return target.hotel[prop as keyof typeof target.hotel]
      },
    })
  }

  get fullAddress() {
    return this.hotel.property.address?.join(', ') || ''
  }

  get priceLabel() {
    return `1 night total (${this.hotel.offer.displayPrice.currency})`
  }
  get amount() {
    return Math.ceil(this.hotel.offer.displayPrice.amount)
  }
  get isFreeCancellation() {
    return (
      this.hotel.offer?.cancellationOption?.cancellationType ===
      'FREE_CANCELLATION'
    )
  }
  get saving() {
    return Math.ceil(this.hotel.offer.savings?.amount || 0)
  }

  // to avoid image caching, add a v=id to the image URL
  get imageUrl() {
    return this.hotel.property.previewImage?.url
      ? `${this.hotel.property.previewImage?.url}v=${this.hotel.id}`
      : ''
  }
}
