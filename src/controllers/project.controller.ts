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
	const project = Project.objects.get({ id: projectId });

	return CustomResponse.success<IProject>(res, {
		data: project,
	});
};
