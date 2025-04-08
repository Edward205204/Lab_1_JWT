import express from 'express'
import authController from '~/controllers/auth.controllers'
import { authenticate } from '~/middlewares/auth.middlewares'

const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/profile/:username', authenticate, authController.profile)

export default router
