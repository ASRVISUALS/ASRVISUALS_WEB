import { Router } from 'express'
import { login, setupAdmin } from '../controllers/authController'

const router = Router()

router.post('/setup-admin', setupAdmin)
router.post('/login', login)

export default router
