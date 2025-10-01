import express from 'express'
import tips from '../data/events.js'

const router = express.Router()

 
router.get('/', (_req, res) => {
  res.status(200).json(tips)
})

export default router
