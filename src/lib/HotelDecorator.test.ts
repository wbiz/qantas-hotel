import { HotelDecorator } from '@/lib/HotelDecorator'
import {Hotel, CancellationType, HotelDecoratorType} from '@/types/types'

describe('HotelDecorator', () => {
  let mockHotel: Hotel
  let decorator: HotelDecorator

  beforeEach(() => {
    mockHotel = {
      id: 'test-id-1',
      property: {
        propertyId: 'test-property-id-1',
        address: ['123 Test St', 'Test City'],
      },
      offer: {
        displayPrice: {
          amount: 100.5,
          currency: 'AUD',
        },
        cancellationOption: {
          cancellationType: 'FREE_CANCELLATION',
        },
        savings: {
          amount: 20.75,
          currency: 'AUD',
        },
      },
    }

    decorator = new HotelDecorator(mockHotel)
  })

  test('fullAddress returns joined address', () => {
    expect(decorator.fullAddress).toBe('123 Test St, Test City')
  })

  test('priceLabel returns correct format', () => {
    expect(decorator.priceLabel).toBe('1 night total (AUD)')
  })

  test('amount returns ceiling of display price', () => {
    expect(decorator.amount).toBe(101)
  })

  test('isFreeCancellation returns true for FREE_CANCELLATION', () => {
    expect(decorator.isFreeCancellation).toBe(true)
  })

  test('saving returns ceiling of savings amount', () => {
    expect(decorator.saving).toBe(21)
  })

  test('isFreeCancellation returns false for non-FREE_CANCELLATION', () => {
    const nonFreeCancellationHotel = {
      ...mockHotel,
      offer: {
        ...mockHotel.offer,
        cancellationOption: {
          cancellationType: 'NOT_REFUNDABLE' as CancellationType,
        },
      },
    }
    const nonFreeDecorator = new HotelDecorator(nonFreeCancellationHotel)
    expect(nonFreeDecorator.isFreeCancellation).toBe(false)
  })

  test('saving returns 0 when no savings', () => {
    const noSavingsHotel = {
      ...mockHotel,
      offer: {
        ...mockHotel.offer,
        savings: undefined,
      },
    }
    const noSavingsDecorator = new HotelDecorator(noSavingsHotel)
    expect(noSavingsDecorator.saving).toBe(0)
  })
})

describe('HotelDecoratorMinimal', () => {
  let mockHotel: Hotel
  let decorator: HotelDecoratorType

  beforeEach(() => {
    mockHotel = {
      id: '1',
      property: {
        propertyId: '1'
      },
      offer: {
        displayPrice: {
          amount: 100,
          currency: 'AUD'
        }
      }
    }

    decorator = new HotelDecorator(mockHotel)
  })

  test('fullAddress handles missing address', () => {
    expect(decorator.fullAddress).toBe('')
  })


  test('priceLabel uses correct currency', () => {
    expect(decorator.priceLabel).toBe('1 night total (AUD)')
  })

  test('amount rounds up to nearest integer', () => {
    mockHotel.offer.displayPrice.amount = 99.01
    decorator = new HotelDecorator(mockHotel)
    expect(decorator.amount).toBe(100)
  })

  test('isFreeCancellation handles missing cancellationOption', () => {
    expect(decorator.isFreeCancellation).toBe(false)
  })

  test('isFreeCancellation handles NOT_REFUNDABLE', () => {
    mockHotel.offer.cancellationOption = { cancellationType: 'NOT_REFUNDABLE' }
    decorator = new HotelDecorator(mockHotel)
    expect(decorator.isFreeCancellation).toBe(false)
  })

  test('saving handles missing savings', () => {
    expect(decorator.saving).toBe(0)
  })

  test('saving rounds up to nearest integer', () => {
    mockHotel.offer.savings = { amount: 10.1, currency: 'AUD' }
    decorator = new HotelDecorator(mockHotel)
    expect(decorator.saving).toBe(11)
  })

  test('proxy fallback works for existing hotel properties', () => {
    mockHotel.property.title = 'Test Hotel'
    decorator = new HotelDecorator(mockHotel)
    expect(decorator.property.title).toBe('Test Hotel')
  })

  test('proxy fallback returns undefined for non-existent properties', () => {
    expect((decorator as any).nonExistentProperty).toBeUndefined()
  })

  test('handles extremely large numbers', () => {
    mockHotel.offer.displayPrice.amount = Number.MAX_SAFE_INTEGER + 1
    mockHotel.offer.savings = { amount: Number.MAX_SAFE_INTEGER + 1, currency: 'AUD' }
    decorator = new HotelDecorator(mockHotel)
    expect(decorator.amount).toBe(Number.MAX_SAFE_INTEGER + 1)
    expect(decorator.saving).toBe(Number.MAX_SAFE_INTEGER + 1)
  })

  test('handles negative prices and savings', () => {
    mockHotel.offer.displayPrice.amount = -100.5
    mockHotel.offer.savings = { amount: -50.5, currency: 'AUD' }
    decorator = new HotelDecorator(mockHotel)
    expect(decorator.amount).toBe(-100)
    expect(decorator.saving).toBe(-50)
  })
})
