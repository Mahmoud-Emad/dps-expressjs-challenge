import { Router } from 'express';
import {
	createReport,
	getReports,
	getReportById,
} from '../controllers/reports.controller';

const router = Router();

router.post('/', createReport);
router.get('/', getReports);
router.get('/:reportId', getReportById);

export default router;
