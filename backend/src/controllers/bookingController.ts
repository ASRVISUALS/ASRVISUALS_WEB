import { Request, Response } from 'express'
import Booking from '../models/Booking'
import { sendBookingConfirmation } from '../services/emailService'

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { planType, videosIncluded, startDate, requirements } = req.body
    const userId = (req as any).user.id

    const booking = await Booking.create({
      userId,
      planType,
      videosIncluded,
      startDate,
      requirements,
      status: 'pending'
    })

    const userEmail = (req as any).user?.email
    if (userEmail) {
      await sendBookingConfirmation(userEmail, booking)
    }

    res.status(201).json({
      success: true,
      data: booking
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error creating booking'
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: message
    })
  }
}

export const getBookings = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id
    const role = (req as any).user.role

    let query = {}
    if (role !== 'admin') {
      query = { userId }
    }

    const bookings = await Booking.find(query)
      .populate('userId', 'name email')
      .sort('-createdAt')

    res.status(200).json({
      success: true,
      data: bookings
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error fetching bookings'
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: message
    })
  }
}

export const updateBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updates = req.body

    const booking = await Booking.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    )

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      })
    }

    res.status(200).json({
      success: true,
      data: booking
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error updating booking'
    res.status(500).json({
      success: false,
      message: 'Error updating booking',
      error: message
    })
  }
}