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
