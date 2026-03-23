import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useBookingStore from '../store/bookingStore'

function BookingForm({ listing }) {
  const navigate = useNavigate()
  const { addBooking } = useBookingStore()

  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!localStorage.getItem('user')) {
      navigate('/login')
      return
    }
    addBooking({
      listingId: listing?.id,
      listingName: listing?.name,
      listingImage: listing?.image,
      ...formData,
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <p className="text-4xl mb-2">🎉</p>
        <h3 className="text-lg font-bold text-green-700">Booking Confirmed!</h3>
        <p className="text-green-600 text-sm mt-1">
          Your stay has been booked successfully.
        </p>
        <button
          onClick={() => navigate('/bookings')}
          className="mt-4 bg-rose-500 text-white px-6 py-2 rounded-full text-sm hover:bg-rose-600 transition"
        >
          View Bookings
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Book This Property</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Check In
          </label>
          <input
            type="date"
            name="checkIn"
            required
            value={formData.checkIn}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-rose-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Check Out
          </label>
          <input
            type="date"
            name="checkOut"
            required
            value={formData.checkOut}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-rose-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Guests
          </label>
          <input
            type="number"
            name="guests"
            min="1"
            max="10"
            required
            value={formData.guests}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-rose-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-rose-500 text-white py-3 rounded-xl font-medium hover:bg-rose-600 transition"
        >
          Reserve Now
        </button>
      </form>
    </div>
  )
}

export default BookingForm