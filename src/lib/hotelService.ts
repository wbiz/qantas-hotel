import { promises as fs } from 'fs'
import path from 'path'
import { Hotel } from '@/types/types'
import { HotelDecorator } from '@/lib/HotelDecorator'

export interface ProductLoader {
  fetch(sort: string): Promise<Hotel[]>
}
export class JsonProductLoader implements ProductLoader {
  constructor(
    private readonly filePath: string = path.join(
      process.cwd(),
      'src/lib',
      'data.json'
    )
  ) {}

  private sortProducts(hotels: Hotel[], sort: string): Hotel[] {
    if (sort === 'asc') {
      return [...hotels].sort(
        (a, b) => a.offer.displayPrice.amount - b.offer.displayPrice.amount
      )
    } else if (sort === 'desc') {
      return [...hotels].sort(
        (a, b) => b.offer.displayPrice.amount - a.offer.displayPrice.amount
      )
    }
    return hotels
  }

  async fetch(sort: string): Promise<Hotel[]> {
    const data = await fs.readFile(this.filePath, 'utf-8')
    const hotels = JSON.parse(data)
    return this.sortProducts(hotels.results, sort)
  }
}

export async function fetchHotels(
  sort: string = '',
  Loader: ProductLoader = new JsonProductLoader()
): Promise<HotelDecorator[]> {
  const data = await Loader.fetch(sort)

  return data.map((hotel: Hotel) => new HotelDecorator(hotel))
}
