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
		return CustomResponse.success<IReport>(res, {
			message: 'Report created successfully',
			status: 201,
			data: report,
		});
	}

	return CustomResponse.badRequest(res, {
		message: 'Please make sure that you entered a valid data',
	});
};

export const getReports = async (req: Request, res: Response) => {
	const reports = Report.objects.all();
	return CustomResponse.success<IReport[]>(res, {
		data: reports,
	});
};

export const getReportById = async (req: Request, res: Response) => {
	const reportId = req.params.reportId.trim();
	if (!reportId) {
		return CustomResponse.badRequest(res, {
			message: 'The report ID is required',
		});
	}

	try {
		const report = Report.objects.get({ id: reportId });
		if (report) {
			return CustomResponse.success<IReport>(res, {
				data: report,
				message: 'Report found',
			});
		}
		return CustomResponse.notFound(res, { message: 'Report not found' });
	} catch (error) {
		console.error(error);
		return CustomResponse.badRequest(res);
	}
};

export const updateReportById = async (req: Request, res: Response) => {
	const reportId = req.params.reportId.trim();
	if (!reportId) {
		return CustomResponse.badRequest(res, {
			message: 'The Report ID is required',
		});
	}

	const data: IReport = req.body;

	if (!data.text) {
		return CustomResponse.badRequest(res, {
			message: 'Report text is required',
		});
	}

	if (!data.projectid) {
		return CustomResponse.badRequest(res, {
			message: 'Project ID is required',
		});
	}

	try {
		const report = Report.objects.update(reportId, data);
		if (report) {
			return CustomResponse.success<IReport>(res, {
				data: report,
				message: 'Report updated',
			});
		}

		return CustomResponse.notFound(res, { message: 'Report not found' });
	} catch (error) {
		console.error(error);
		return CustomResponse.badRequest(res);
	}
};

export const deleteReportById = async (req: Request, res: Response) => {
	const reportId = req.params.reportId.trim();
	if (!reportId) {
		return CustomResponse.badRequest(res, {
			message: 'The report ID is required',
		});
	}

	try {
		const report = Report.objects.delete(reportId);
		if (report) {
			return CustomResponse.success<IReport>(res, {
				message: 'Report deleted',
				status: 204,
			});
		}

		return CustomResponse.notFound(res, { message: 'Report not found' });
	} catch (error) {
		console.error(error);
		return CustomResponse.badRequest(res);
	}
};
