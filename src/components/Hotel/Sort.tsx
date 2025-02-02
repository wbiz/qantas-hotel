'use client'

import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function Sort() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sort = searchParams.get('sort') || 'default'

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams)
    if (e.target.value !== 'desc' && e.target.value !== 'asc') {
      params.delete('sort')
    } else {
      params.set('sort', e.target.value)
    }
    router.push(`?${params.toString()}`)
  }
  return (
    <div>
      <label htmlFor="sort-select">Sort by </label>
      <select
        id="sort-select"
        onChange={handleSortChange}
        value={sort}
        aria-label="Sort Hotels"
      >
        <option value="">default</option>
        <option value="desc">Price high-low</option>
        <option value="asc">Price low-high</option>
      </select>
    </div>
  )
}
