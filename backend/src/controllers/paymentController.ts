import { Request, Response } from 'express'
import Payment from '../models/Payment'

export const getPayments = async (_req: Request, res: Response) => {
	try {
		const payments = await Payment.find({}).sort({ createdAt: -1 })
		res.status(200).json({ success: true, data: payments })
	} catch (error) {
		res.status(500).json({ success: false, message: 'Error fetching payments' })
	}
}

export const updatePayment = async (req: Request, res: Response) => {
	try {
		const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
		if (!payment) {
			return res.status(404).json({ success: false, message: 'Payment not found' })
		}
		res.status(200).json({ success: true, data: payment })
	} catch (error) {
		res.status(500).json({ success: false, message: 'Error updating payment' })
	}
}
