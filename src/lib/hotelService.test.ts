import {
  fetchHotels,
  ProductLoader,
  JsonProductLoader,
} from '@/lib/hotelService'
import { Hotel, HotelDecoratorType } from '@/types/types'
import { HotelDecorator } from '@/lib/HotelDecorator'

const mockHotels: Hotel[] = [
  { offer: { displayPrice: { amount: 100 } } },
  { offer: { displayPrice: { amount: 50 } } },
  { offer: { displayPrice: { amount: 150 } } },
] as Hotel[]

// Mock the fs module
jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
  },
}))

// Mock the HotelDecorator
jest.mock('@/lib/HotelDecorator', () => ({
  HotelDecorator: jest.fn().mockImplementation((hotel) => hotel),
}))

describe('fetchHotels', () => {
  const mockJsonData = JSON.stringify({ results: mockHotels })

  beforeEach(() => {
    ;(require('fs').promises.readFile as jest.Mock).mockResolvedValue(
      mockJsonData
    )
  })

  it('should fetch and return hotels', async () => {
    const result = await fetchHotels()
    expect(result).toHaveLength(3)
    expect(HotelDecorator).toHaveBeenCalledTimes(3)
  })

  it('should sort hotels in ascending order', async () => {
    const result = await fetchHotels('asc')
    expect((result[0] as HotelDecoratorType).offer.displayPrice.amount).toBe(50)
    expect((result[2] as HotelDecoratorType).offer.displayPrice.amount).toBe(
      150
    )
  })

  it('should sort hotels in descending order', async () => {
    const result = await fetchHotels('desc')
    expect((result[0] as HotelDecoratorType).offer.displayPrice.amount).toBe(
      150
    )
    expect((result[2] as HotelDecoratorType).offer.displayPrice.amount).toBe(50)
  })

  it('should use custom loader if provided', async () => {
    const mockLoader: ProductLoader = {
      fetch: jest.fn().mockResolvedValue(mockHotels),
    }
    await fetchHotels('', mockLoader)
    expect(mockLoader.fetch).toHaveBeenCalledWith('')
  })
})

describe('JsonProductLoader', () => {
  const mockJsonData = JSON.stringify({ results: mockHotels })

  beforeEach(() => {
    ;(require('fs').promises.readFile as jest.Mock).mockResolvedValue(
      mockJsonData
    )
  })

  it('should read and parse JSON file', async () => {
    const loader = new JsonProductLoader()
    const result = await loader.fetch('')
    expect(result).toEqual(mockHotels)
  })

  it('should sort hotels in ascending order', async () => {
    const loader = new JsonProductLoader()
    const result = await loader.fetch('asc')
    expect(result[0].offer.displayPrice.amount).toBe(50)
    expect(result[2].offer.displayPrice.amount).toBe(150)
  })

  it('should sort hotels in descending order', async () => {
    const loader = new JsonProductLoader()
    const result = await loader.fetch('desc')
    expect(result[0].offer.displayPrice.amount).toBe(150)
    expect(result[2].offer.displayPrice.amount).toBe(50)
  })
})
