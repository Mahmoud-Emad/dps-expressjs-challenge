import { Router } from 'express';
import { createReport, getReports } from '../controllers/reports.controller';

const router = Router();

router.post('/', createReport);
router.get('/', getReports);

export default router;
