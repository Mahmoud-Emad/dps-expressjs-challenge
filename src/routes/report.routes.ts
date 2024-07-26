import { Router } from 'express';
import {
	createReport,
	getReports,
	getReportById,
	updateReportById,
	deleteReportById,
} from '../controllers/reports.controller';

const router = Router();

router.post('/', createReport);
router.get('/', getReports);
router.get('/:reportId', getReportById);
router.put('/:reportId', updateReportById);
router.delete('/:reportId', deleteReportById);

export default router;
