import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

function ListingCard({ listing }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()

  const item = listing?.listing
  const pricing = listing?.pricingQuote

  if (!item) return null

  const id = item.id
  const name = item.name
  const city = item.contextualPictures?.[0]?.picture || ''
  const price = pricing?.structuredStayDisplayPrice?.primaryLine?.price || 'N/A'
  const rating = item.avgRatingLocalized || 'No rating'
  const image = item.contextualPictures?.[0]?.picture || ''

  const handleFavorite = () => {
    if (isFavorite(id)) {
      removeFavorite(id)
    } else {
      addFavorite({ id, name, image, price, rating })
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/listing/${id}`}>
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <Link to={`/listing/${id}`}>
            <h2 className="font-semibold text-gray-800 hover:text-rose-500">
              {name}
            </h2>
          </Link>
          <button
            onClick={handleFavorite}
            className="text-xl"
          >
            {isFavorite(id) ? '❤️' : '🤍'}
          </button>
        </div>
        <p className="text-gray-500 text-sm mt-1">⭐ {rating}</p>
        <p className="text-rose-500 font-bold mt-2">{price} / night</p>
      </div>
    </div>
  )
}

export default ListingCard