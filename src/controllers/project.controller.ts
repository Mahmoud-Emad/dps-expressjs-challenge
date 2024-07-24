import { Request, Response } from 'express';
import db from '../services/db.service';
import type { ProjectType, ReportType } from '../types';

export const getProjects = async (req: Request, res: Response) => {
	const projects = db.query('SELECT * FROM projects;');
	res.json(projects);
};

export const getProjectByID = async (req: Request, res: Response) => {
	const projectId = req.params.projectId.trim();

	if (!projectId) {
		return res.status(400).json({ message: 'The project ID is required' });
	}

	if (isNaN(+projectId)) {
		return res.status(400).json({
			message: 'Please make sure that you entered a valid data.',
		});
	}

	try {
		const project = (await db.query(
			`SELECT * FROM projects WHERE id=${projectId}`,
		)) as unknown as ProjectType[];

		if (!project.length) {
			return res.status(404).json({ message: 'Project not found' });
		}

		const reports = (await db.query(
			`SELECT * FROM reports WHERE projectid=${projectId};`,
		)) as ReportType[];

		project[0].reports = reports;

		return res.json(project[0]);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
};
