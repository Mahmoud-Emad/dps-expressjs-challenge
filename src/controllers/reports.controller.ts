import { Request, Response } from 'express';
import Report from '../models/reports.model';
import CustomResponse from '../api/response';
import { IReport } from '../types';
import Project from '../models/project.model';

export const createReport = async (req: Request, res: Response) => {
	const data: IReport = req.body;

	if (!data.projectid) {
		return CustomResponse.badRequest(res, {
			message: 'Project ID is required',
		});
	}

	if (!data.text) {
		return CustomResponse.badRequest(res, {
			message: 'Report text is required',
		});
	}

	const project = Project.objects.get({ id: data.projectid });
	if (!project) {
		return CustomResponse.notFound(res, { message: 'Project not found' });
	}

	const report = Report.objects.create({
		projectid: data.projectid,
		text: data.text,
	});

	if (report) {
		// Can handle the error by catching it and then forwarding it to the user.
		return CustomResponse.success(res, {
			message: 'Report created successfully',
			status: 201,
			data: report,
		});
	}

	return CustomResponse.badRequest<IReport>(res, {
		message: 'Please make sure that you entered a valid data',
	});
};
