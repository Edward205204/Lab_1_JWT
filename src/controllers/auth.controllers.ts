import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { signToken } from '~/utils/jwt'
import authService from '~/services/auth.services'
import Authentication from '~/models/schemas/authentication'

class authController {
  async register(req: Request, res: Response) {
    try {
      const { username, password } = req.body
      if (!username || !password) {
        res.status(400).json({ message: 'Missing fields' })
        return
      }

      const existing = await authService.findByName(username)
      if (existing) {
        res.status(400).json({ message: 'Username already exists' })
        return
      }

      const hashed = await bcrypt.hash(password, 10)
      const newUser = new Authentication({ username: username, password: hashed })
      await authService.register(newUser)

      res.status(201).json({
        message: 'User registered successfully',
        user: {
          _id: newUser._id,
          username: newUser.username
        }
      })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', data: error })
    }
  }

  async logout(req: Request, res: Response) {
    try {
      res.json({ message: 'Logout successful' })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', data: error })
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body
      const user = await authService.login(username)
      if (!user) {
        res.status(400).json({ message: 'Invalid credentials' })
        return
      }

      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        res.status(400).json({ message: 'Invalid credentials' })
        return
      }

      const token = signToken({ _id: user._id, username: user.username })
      res.json({
        message: 'Login successful',
        token,
        user: {
          _id: user._id,
          username: user.username
        }
      })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', data: error })
    }
  }

  async profile(req: Request, res: Response) {
    try {
      const { username } = req.params

      const userProfile = await authService.findProfile(username)

      if (!userProfile) {
        res.status(404).json({ message: 'User not found' })
        return
      }

      res.json({
        message: 'User profile retrieved successfully',
        user: {
          _id: userProfile._id,
          username: userProfile.username,
          createdAt: userProfile.createdAt
        }
      })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', data: error })
    }
  }
}

export default new authController()
