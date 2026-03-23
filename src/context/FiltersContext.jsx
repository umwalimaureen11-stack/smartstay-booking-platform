import { createContext, useContext, useState } from 'react'

const FiltersContext = createContext()

export function FiltersProvider({ children }) {
  const [filters, setFilters] = useState({
    location: '',
    minPrice: 0,
    maxPrice: 1000,
    rating: 0,
  })

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const resetFilters = () => {
    setFilters({
      location: '',
      minPrice: 0,
      maxPrice: 1000,
      rating: 0,
    })
  }

  return (
    <FiltersContext.Provider value={{ filters, updateFilters, resetFilters }}>
      {children}
    </FiltersContext.Provider>
  )
}

export function useFilters() {
  return useContext(FiltersContext)
}