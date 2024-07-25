import { Router } from 'express';
import {
	createProject,
	getProjects,
	getProjectById,
	updateProjectById,
} from '../controllers/project.controller';

const router = Router();

router.post('/', createProject);
router.get('/', getProjects);
router.get('/:projectId/', getProjectById);
router.put('/:projectId/', updateProjectById);

export default router;
