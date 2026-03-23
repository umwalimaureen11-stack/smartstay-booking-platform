import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { Link } from 'react-router-dom'

function Favorites() {
  const navigate = useNavigate()
  const { favorites, removeFavorite } = useFavorites()

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Favorites</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-6xl mb-4">❤️</p>
          <h2 className="text-xl font-semibold text-gray-600">No favorites yet</h2>
          <p className="text-gray-400 mt-2">Save properties you love by clicking the heart icon</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition"
          >
            Explore Properties
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <Link to={`/listing/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <Link to={`/listing/${item.id}`}>
                    <h3 className="font-semibold text-gray-800 hover:text-rose-500">
                      {item.name}
                    </h3>
                  </Link>
                  <button
                    onClick={() => removeFavorite(item.id)}
                    className="text-xl"
                  >
                    ❤️
                  </button>
                </div>
                <p className="text-gray-500 text-sm mt-1">⭐ {item.rating}</p>
                <p className="text-rose-500 font-bold mt-2">{item.price}/night</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites