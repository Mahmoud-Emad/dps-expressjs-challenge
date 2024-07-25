import { Request, Response } from 'express';
import Project from '../models/project.model';
import CustomResponse from '../api/response';
import { IProject } from '../types';

export const createProject = async (req: Request, res: Response) => {
	const data: IProject = req.body;

	if (!data.name) {
		return CustomResponse.badRequest(res, {
			message: 'Project name is required',
		});
	}

	if (!data.description) {
		return CustomResponse.badRequest(res, {
			message: 'Project description is required',
		});
	}

	const project = Project.objects.create({
		name: data.name,
		description: data.description,
		reports: [],
	});

	if (project) {
		// Can handle the error by catching it and then forwarding it to the user.
		return CustomResponse.success(res, {
			message: 'Project created successfully',
			status: 201,
			data: project,
		});
	}

	return CustomResponse.badRequest<IProject>(res, {
		message: 'Please make sure that you entered a valid data',
	});
};

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

export const updateProjectById = async (req: Request, res: Response) => {
	const projectId = req.params.projectId.trim();
	if (!projectId) {
		return CustomResponse.badRequest<IProject>(res, {
			message: 'The project ID is required',
		});
	}

	const data: IProject = req.body;

	if (!data.name) {
		return CustomResponse.badRequest(res, {
			message: 'Project name is required',
		});
	}

	if (!data.description) {
		return CustomResponse.badRequest(res, {
			message: 'Project description is required',
		});
	}

	try {
		const project = Project.objects.update(projectId, data);
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

export const deleteProjectById = async (req: Request, res: Response) => {
	const projectId = req.params.projectId.trim();
	if (!projectId) {
		return CustomResponse.badRequest<IProject>(res, {
			message: 'The project ID is required',
		});
	}

	try {
		const project = Project.objects.delete(projectId);
		if (project) {
			return CustomResponse.success<IProject>(res, {
				message: 'Project deleted',
				status: 204,
			});
		}

		return CustomResponse.notFound(res, { message: 'Project not found' });
	} catch (error) {
		console.error(error);
		return CustomResponse.badRequest<IProject>(res);
	}
};
