import express from 'express';
import { createPdf, pdfCallback } from '../controllers/docraptor.controller.js';

const router = express.Router();

router.post('/pdf', createPdf);
router.post('/callback', pdfCallback);

export default router;
