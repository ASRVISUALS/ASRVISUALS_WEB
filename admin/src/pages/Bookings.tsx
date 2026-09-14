import { useEffect, useState } from 'react'
import api from '../lib/api'
import Topbar from '../components/Topbar'

type Booking = {
  _id: string
  planType: string
  status: string
  startDate: string
  videosIncluded: number
  paymentStatus: string
}

const BookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    api.get('/bookings').then((res) => setBookings(res.data.data || [])).catch(() => setBookings([]))
  }, [])

  return (
    <div>
      <Topbar title="Bookings" />
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Plan</th>
              <th>Status</th>
              <th>Start</th>
              <th>Videos</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.planType}</td>
                <td>{booking.status}</td>
                <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                <td>{booking.videosIncluded}</td>
                <td>{booking.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BookingsPage
