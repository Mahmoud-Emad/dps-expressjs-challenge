import { Router } from 'express';
import { getProjects, getProjectByID } from '../controllers/project.controller';

const router = Router();

router.get('/', getProjects);
router.get('/:projectId/', getProjectByID);

export default router;
