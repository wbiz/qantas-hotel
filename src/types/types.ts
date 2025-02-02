import React from 'react'
import { HotelDecorator } from '@/lib/HotelDecorator'
export type Hotel = {
  id: string
  property: Property
  offer: Offer
}
type ImageType = 'PRIMARY'
export type RatingType = 'self' | 'star'
type PromotionType = 'CAMPAIGN' | 'MEMBER'
export type CancellationType = 'NOT_REFUNDABLE' | 'FREE_CANCELLATION'

export type Property = {
  propertyId: string
  title?: string
  address?: [string, string]
  previewImage?: {
    url: string
    caption?: string
    imageType?: ImageType
  }
  rating?: {
    ratingValue: number
    ratingType: RatingType
  }
}

export type Offer = {
  promotion?: {
    title: string
    type: PromotionType
  }
  name?: string
  displayPrice: {
    amount: number
    currency: string
  }
  savings?: {
    amount: number
    currency: string
  }
  cancellationOption?: {
    cancellationType: CancellationType
  }
}

export type HotelDecoratorType = Hotel & HotelDecorator

///
export type WithKeyProps = { key?: React.Key }

////
export type RatingIconType = 'filled' | 'empty' | 'half'
