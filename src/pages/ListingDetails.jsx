import { useParams, useNavigate } from 'react-router-dom'
import { useListingDetails } from '../hooks/useListingDetails'
import BookingForm from '../components/BookingForm'
import Loader from '../components/Loader'
import { useFavorites } from '../context/FavoritesContext'

const mockDetails = {
  '1': {
    id: '1',
    name: 'Cozy Beach House',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800',
    price: '$120',
    description: 'A beautiful beach house with stunning ocean views. Perfect for a relaxing getaway with family or friends. Enjoy the sound of waves and fresh sea breeze.',
    amenities: ['WiFi', 'Pool', 'Kitchen', 'Free Parking', 'Air Conditioning', 'TV'],
    hostName: 'John Smith',
    city: 'Malibu, California',
  },
  '2': {
    id: '2',
    name: 'Modern City Apartment',
    rating: '4.5',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    price: '$85',
    description: 'A sleek modern apartment in the heart of the city. Walking distance to restaurants, shops and attractions. Perfect for business or leisure.',
    amenities: ['WiFi', 'Gym', 'Rooftop', 'Doorman', 'Air Conditioning', 'Washer'],
    hostName: 'Sarah Johnson',
    city: 'New York, NY',
  },
  '3': {
    id: '3',
    name: 'Mountain View Cabin',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800',
    price: '$200',
    description: 'A charming cabin nestled in the mountains with breathtaking views. Ideal for hiking lovers and nature enthusiasts seeking peace and quiet.',
    amenities: ['WiFi', 'Fireplace', 'Hot Tub', 'BBQ', 'Pet Friendly', 'Parking'],
    hostName: 'Mike Williams',
    city: 'Aspen, Colorado',
  },
  '4': {
    id: '4',
    name: 'Luxury Villa with Pool',
    rating: '5.0',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
    price: '$350',
    description: 'An exclusive luxury villa with a private pool, lush gardens and premium amenities. The ultimate retreat for those who want nothing but the best.',
    amenities: ['WiFi', 'Private Pool', 'Chef Kitchen', 'Home Theater', 'Spa', 'Concierge'],
    hostName: 'Emma Davis',
    city: 'Miami, Florida',
  },
  '5': {
    id: '5',
    name: 'Charming Studio Downtown',
    rating: '4.3',
    image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800',
    price: '$65',
    description: 'A cozy and affordable studio in the heart of downtown. Great for solo travelers or couples exploring the city on a budget.',
    amenities: ['WiFi', 'Smart TV', 'Coffee Maker', 'Air Conditioning', 'Workspace', 'Keyless Entry'],
    hostName: 'Chris Brown',
    city: 'Austin, Texas',
  },
  '6': {
    id: '6',
    name: 'Lakeside Retreat',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    price: '$175',
    description: 'A serene lakeside retreat surrounded by nature. Wake up to stunning water views and enjoy kayaking, fishing and campfires by the lake.',
    amenities: ['WiFi', 'Kayak', 'Fire Pit', 'Fishing Gear', 'Boat Dock', 'Full Kitchen'],
    hostName: 'Lisa Anderson',
    city: 'Lake Tahoe, Nevada',
  },
}


function ListingDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading } = useListingDetails(id)
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()

  if (isLoading) return <Loader />

  const raw = data?.data
  const listing = raw ? {
    id: raw.id,
    name: raw.name,
    image: raw.contextualPictures?.[0]?.picture || mockDetails[id]?.image,
    price: raw.structuredStayDisplayPrice?.primaryLine?.price || 'N/A',
    rating: raw.avgRatingLocalized || 'No rating',
    description: raw.description || mockDetails[id]?.description,
    amenities: raw.amenities?.map(a => a.title) || mockDetails[id]?.amenities,
    hostName: raw.primaryHost?.smartName || mockDetails[id]?.hostName,
    city: raw.city || mockDetails[id]?.city,
  } : (mockDetails[id] || mockDetails['1'])

  const handleFavorite = () => {
    if (isFavorite(listing.id)) {
      removeFavorite(listing.id)
    } else {
      addFavorite(listing)
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-rose-500 hover:underline text-sm flex items-center gap-1"
      >
        ← Back to listings
      </button>

      <div className="relative">
        <img
          src={listing.image}
          alt={listing.name}
          className="w-full h-72 md:h-96 object-cover rounded-2xl"
        />
        <button
          onClick={handleFavorite}
          className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md text-xl"
        >
          {isFavorite(listing.id) ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800">{listing.name}</h1>
          <p className="text-gray-500 mt-1">📍 {listing.city}</p>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-rose-500 font-bold text-xl">{listing.price}/night</span>
            <span className="text-gray-500">⭐ {listing.rating}</span>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600">
              Hosted by <span className="font-semibold">{listing.hostName}</span>
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-bold text-gray-800 mb-2">About this place</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{listing.description}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Amenities</h2>
            <div className="grid grid-cols-2 gap-2">
              {listing.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-700"
                >
                  ✓ {amenity}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-80 flex-shrink-0">
          <BookingForm listing={listing} />
        </div>
      </div>
    </div>
  )
}

export default ListingDetails