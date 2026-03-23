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
      contextualPictures: [{ picture: 'https://a0.muscache.com/im/pictures/miso/Hosting-3096334/original/8ca1d4a1-6d4c-4b82-81a1-b5f44aa3f1d0.jpeg' }],
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
      contextualPictures: [{ picture: 'https://a0.muscache.com/im/pictures/miso/Hosting-3096334/original/8ca1d4a1-6d4c-4b82-81a1-b5f44aa3f1d0.jpeg' }],
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
      contextualPictures: [{ picture: 'https://a0.muscache.com/im/pictures/miso/Hosting-3096334/original/8ca1d4a1-6d4c-4b82-81a1-b5f44aa3f1d0.jpeg' }],
    },
    pricingQuote: {
      structuredStayDisplayPrice: { primaryLine: { price: '$200' } }
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
        <h1 className="text-2xl font-bold mb-4">Available Properties</h1>
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