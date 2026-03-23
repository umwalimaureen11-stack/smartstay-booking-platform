import { useState } from 'react'
import { useListings } from '../hooks/useListings'
import Loader from '../components/Loader'
import ListingCard from '../components/ListingCard'
import Sidebar from '../components/Sidebar'

const mockListings = [
  {
    listing: {
      id: '1',
      name: 'Cozy Beach House',
      avgRatingLocalized: '4.8',
      contextualPictures: [{ picture: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800' }],
    },
    pricingQuote: {
      structuredStayDisplayPrice: { primaryLine: { price: '$120' } }
    }
  },
  {
    listing: {
      id: '2',
      name: 'Modern City Apartment',
      avgRatingLocalized: '4.5',
      contextualPictures: [{ picture: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800' }],
    },
    pricingQuote: {
      structuredStayDisplayPrice: { primaryLine: { price: '$85' } }
    }
  },
  {
    listing: {
      id: '3',
      name: 'Mountain View Cabin',
      avgRatingLocalized: '4.9',
      contextualPictures: [{ picture: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800' }],
    },
    pricingQuote: {
      structuredStayDisplayPrice: { primaryLine: { price: '$200' } }
    }
  },
  {
    listing: {
      id: '4',
      name: 'Luxury Villa with Pool',
      avgRatingLocalized: '5.0',
      contextualPictures: [{ picture: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800' }],
    },
    pricingQuote: {
      structuredStayDisplayPrice: { primaryLine: { price: '$350' } }
    }
  },
  {
    listing: {
      id: '5',
      name: 'Charming Studio Downtown',
      avgRatingLocalized: '4.3',
      contextualPictures: [{ picture: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800' }],
    },
    pricingQuote: {
      structuredStayDisplayPrice: { primaryLine: { price: '$65' } }
    }
  },
  {
    listing: {
      id: '6',
      name: 'Lakeside Retreat',
      avgRatingLocalized: '4.7',
      contextualPictures: [{ picture: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800' }],
    },
    pricingQuote: {
      structuredStayDisplayPrice: { primaryLine: { price: '$175' } }
    }
  },
]

function Home() {
  const [placeId] = useState('ChIJD7fiBh9u5kcRYJSMaMOCCwQ')
  const { data, isLoading, isError, error } = useListings(placeId)

  if (isLoading) return <Loader />

  const listings = data?.data?.list || mockListings

  return (
    <div className="flex gap-6 p-4">
      {/* Sidebar */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {isError && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-yellow-700 text-sm">
            ⚠️ {error.message} — Showing sample listings instead.
          </div>
        )}
        <h1 className="text-2xl font-bold mb-2">Available Properties</h1>
        <p className="text-gray-500 text-sm mb-6">
          Explore our hand-picked selection of amazing stays
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home