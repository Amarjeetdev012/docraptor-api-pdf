import express from 'express'
import { createPdf } from '../controllers/docraptor.controller.js'

const router = express.Router()

router.post('/pdf',createPdf)

export default router