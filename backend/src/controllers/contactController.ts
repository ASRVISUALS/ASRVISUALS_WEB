import { Request, Response } from 'express'
import Contact from '../models/Contact'

export const createContact = async (req: Request, res: Response) => {
	try {
		const contact = await Contact.create(req.body)
		res.status(201).json({ success: true, data: contact })
	} catch (error) {
		res.status(500).json({ success: false, message: 'Error creating contact submission' })
	}
}

export const getContacts = async (_req: Request, res: Response) => {
	try {
		const contacts = await Contact.find({}).sort({ createdAt: -1 })
		res.status(200).json({ success: true, data: contacts })
	} catch (error) {
		res.status(500).json({ success: false, message: 'Error fetching contacts' })
	}
}

export const updateContact = async (req: Request, res: Response) => {
	try {
		const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
		if (!contact) {
			return res.status(404).json({ success: false, message: 'Contact not found' })
		}
		res.status(200).json({ success: true, data: contact })
	} catch (error) {
		res.status(500).json({ success: false, message: 'Error updating contact' })
	}
}
