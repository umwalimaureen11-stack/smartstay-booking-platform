import { useNavigate } from 'react-router-dom'
import useBookingStore from '../store/bookingStore'

function Bookings() {
  const navigate = useNavigate()
  const { bookings, cancelBooking } = useBookingStore()

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-6xl mb-4">📋</p>
          <h2 className="text-xl font-semibold text-gray-600">No bookings yet</h2>
          <p className="text-gray-400 mt-2">Start exploring properties to make a booking</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition"
          >
            Explore Properties
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
            >
              <div className="flex gap-4 items-center">
                {booking.listingImage && (
                  <img
                    src={booking.listingImage}
                    alt={booking.listingName}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-gray-800">{booking.listingName}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    📅 {booking.checkIn} → {booking.checkOut}
                  </p>
                  <p className="text-sm text-gray-500">
                    👥 {booking.guests} guest(s)
                  </p>
                </div>
              </div>
              <button
                onClick={() => cancelBooking(booking.id)}
                className="bg-red-50 text-red-500 border border-red-200 px-4 py-2 rounded-lg text-sm hover:bg-red-100 transition"
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Bookings