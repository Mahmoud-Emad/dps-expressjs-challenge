import { Router } from 'express';
import {
	createReport,
	getReports,
	getReportById,
	updateReportById,
	deleteReportById,
	getReportsWithFrequentWords,
} from '../controllers/reports.controller';

const router = Router();

router.post('/', createReport);
router.get('/', getReports);
router.get('/frequent-words', getReportsWithFrequentWords);
router.get('/:reportId', getReportById);
router.put('/:reportId', updateReportById);
router.delete('/:reportId', deleteReportById);

export default router;
