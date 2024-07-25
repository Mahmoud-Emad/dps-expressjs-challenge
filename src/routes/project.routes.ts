import { Router } from 'express';
import { getProjects, getProjectById } from '../controllers/project.controller';

const router = Router();

router.get('/', getProjects);
router.get('/:projectId/', getProjectById);

export default router;
