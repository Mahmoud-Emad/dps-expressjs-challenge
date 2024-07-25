import { Router } from 'express';
import {
	createProject,
	getProjects,
	getProjectById,
	updateProjectById,
	deleteProjectById,
} from '../controllers/project.controller';

const router = Router();

router.post('/', createProject);
router.get('/', getProjects);
router.get('/:projectId/', getProjectById);
router.put('/:projectId/', updateProjectById);
router.delete('/:projectId/', deleteProjectById);

export default router;
