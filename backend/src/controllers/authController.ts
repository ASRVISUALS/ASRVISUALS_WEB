import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'

const signToken = (id: string, role: string) => {
	return jwt.sign({ id, role }, process.env.JWT_SECRET!, {
		expiresIn: '7d'
	})
}

export const setupAdmin = async (req: Request, res: Response) => {
	try {
		const setupKey = req.headers['x-admin-setup-key'] as string

		if (!process.env.ADMIN_SETUP_KEY || setupKey !== process.env.ADMIN_SETUP_KEY) {
			return res.status(403).json({
				success: false,
				message: 'Invalid setup key'
			})
		}

		const { name, email, password } = req.body

		const existingAdmin = await User.findOne({ role: 'admin' })
		if (existingAdmin) {
			return res.status(400).json({
				success: false,
				message: 'Admin already exists'
			})
		}

		const user = await User.create({
			name,
			email,
			password,
			role: 'admin'
		})

		const token = signToken(user.id, user.role)

		res.status(201).json({
			success: true,
			data: {
				id: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
				token
			}
		})
	} catch (error) {
		console.error('Setup admin failed:', error)
		res.status(500).json({
			success: false,
			message: 'Error setting up admin'
		})
	}
}

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body

		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: 'Email and password are required'
			})
		}

		const user = await User.findOne({ email }).select('+password')
		if (!user) {
			return res.status(401).json({
				success: false,
				message: 'Invalid credentials'
			})
		}

		const isMatch = await user.comparePassword(password)
		if (!isMatch) {
			return res.status(401).json({
				success: false,
				message: 'Invalid credentials'
			})
		}

		const token = signToken(user.id, user.role)

		res.status(200).json({
			success: true,
			data: {
				id: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
				token
			}
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Error logging in'
		})
	}
}
