import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navbar() {
  const [search, setSearch] = useState('')
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/?search=${search}`)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-rose-500 text-2xl font-bold">🏠 SmartStay</span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="flex items-center border-2 border-gray-200 rounded-full px-4 py-2 hover:border-rose-300 transition">
            <input
              type="text"
              placeholder="Search destinations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 outline-none text-sm text-gray-600"
            />
            <button type="submit" className="text-rose-500 font-bold text-sm ml-2">
              🔍
            </button>
          </div>
        </form>

        {/* Nav Links */}
        <div className="flex items-center gap-4">
          <Link
            to="/favorites"
            className="text-gray-600 hover:text-rose-500 text-sm font-medium transition"
          >
            ❤️ Favorites
          </Link>
          <Link
            to="/bookings"
            className="text-gray-600 hover:text-rose-500 text-sm font-medium transition"
          >
            📋 Bookings
          </Link>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">👤 {user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-rose-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-rose-600 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar