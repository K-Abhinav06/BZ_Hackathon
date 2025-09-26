import express from 'express';
import { searchProblems } from '../controllers/problemController.js';

const router = express.Router();
router.post('/search', searchProblems);

export default router;