import express from 'express'
import TipsController from '../controllers/gifts.js'

const router = express.Router()

router.get('/', TipsController.getTips)

router.get('/:slug', TipsController.getTipBySlug)

export default router
