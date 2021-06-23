import express from 'express'
import bcrypt from 'bcryptjs'
import { User } from '../models'
import { TooManyRequests } from 'http-errors'
import { requireAuth } from '../middleware'


const router = express.Router()

router
  .route('/:id')
  .get(async (request, response) => {
    const populateQuery = [
      {
        path: 'posts',
        populate: { path: 'author', select: ['username', 'profile_image'] },
      },
    ]

    const user = await User.findOne({ username: request.params.id })
      .populate(populateQuery)
      .exec()
    if (user) {
      response.json(user.toJSON())
    } else {
      response.status(404).end()
    }
  })
  .put(requireAuth, async (request, response) => {
    const { password } = request.body
    const { current_password } = request.body
    const { profile_image } = request.body
    const { id } = request.params

    if (password.length < 8 || password.length > 20) {
      return response.status(400).json({ error: "Password length must be between 8 and 20 characters"})
    }

    const user = await User.findById({ _id: id })
    const correctPassword = await bcrypt.compare(current_password, user.passwordHash)

    

    if (!correctPassword) {
      return response.status(401).json({ message: "Incorrect Password" })
    } else {
      const hashedpassword = await bcrypt.hash(password, 12)
      try {
      const userUpdate = await User.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          passwordHash: hashedpassword,
          profile_image: profile_image
        },
        {
          new: true,
        }
      )

      response.json(userUpdate.toJSON())
    } catch (error) {
      response.status(404).end()
    }
  }})

module.exports = router
