import { Request, Response } from 'express';
import Project from '../models/project.model';
import CustomResponse from '../api/response';
import { IProject } from '../types';

export const getProjects = async (req: Request, res: Response) => {
	const projects = Project.objects.all();
	return CustomResponse.success<IProject[]>(res, {
		data: projects,
	});
};

export const getProjectById = async (req: Request, res: Response) => {
	const projectId = req.params.projectId.trim();
	if (!projectId) {
		return CustomResponse.badRequest<IProject>(res, {
			message: 'The project ID is required',
		});
	}

	try {
		const project = Project.objects.get({ id: projectId });
		if (project) {
			return CustomResponse.success<IProject>(res, {
				data: project,
				message: 'Project found',
			});
		}
		return CustomResponse.notFound(res, { message: 'Project not found' });
	} catch (error) {
		console.error(error);
		return CustomResponse.badRequest<IProject>(res);
	}
};
