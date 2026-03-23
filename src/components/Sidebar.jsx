import { useFilters } from '../context/FiltersContext'

function Sidebar() {
  const { filters, updateFilters, resetFilters } = useFilters()

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Filters</h2>
        <button
          onClick={resetFilters}
          className="text-rose-500 text-sm hover:underline"
        >
          Reset
        </button>
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <input
          type="text"
          placeholder="Where are you going?"
          value={filters.location}
          onChange={(e) => updateFilters({ location: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-rose-300"
        />
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Max Price: <span className="text-rose-500">${filters.maxPrice}</span>
        </label>
        <input
          type="range"
          min="0"
          max="1000"
          value={filters.maxPrice}
          onChange={(e) => updateFilters({ maxPrice: Number(e.target.value) })}
          className="w-full accent-rose-500"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>$0</span>
          <span>$1000</span>
        </div>
      </div>

      {/* Min Price Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Min Price: <span className="text-rose-500">${filters.minPrice}</span>
        </label>
        <input
          type="range"
          min="0"
          max="1000"
          value={filters.minPrice}
          onChange={(e) => updateFilters({ minPrice: Number(e.target.value) })}
          className="w-full accent-rose-500"
        />
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Minimum Rating
        </label>
        <div className="flex gap-2">
          {[0, 3, 4, 4.5].map((val) => (
            <button
              key={val}
              onClick={() => updateFilters({ rating: val })}
              className={`px-3 py-1 rounded-full text-sm border transition ${
                filters.rating === val
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'border-gray-200 text-gray-600 hover:border-rose-300'
              }`}
            >
              {val === 0 ? 'Any' : `${val}+`}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar