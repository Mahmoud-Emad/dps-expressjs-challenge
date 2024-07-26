import type { IReport, IReportManagement, GetByIdOptions } from '../types';
import db from '../services/db.service';
import { v4 as uuidv4 } from 'uuid';

class ReportManagement implements IReportManagement {
	update(projectId: string, newValues: IReport) {
		console.log(projectId, newValues);
		return null;
	}

	get(options: GetByIdOptions) {
		console.log(options);
		return null;
	}

	delete(reportId: string) {
		console.log(reportId);
		return null;
	}

	all(): IReport[] {
		const reports = db.query('SELECT * FROM reports;') as IReport[];
		return reports || [];
	}

	create(values: IReport): IReport | null {
		try {
			const id = uuidv4();
			const sql =
				'INSERT INTO reports (id, projectid, text) VALUES (@id, @projectid, @text)';
			db.run(sql, { id, projectid: values.projectid, text: values.text });

			return values as unknown as IReport;
		} catch {
			return null;
		}
	}
}

class Report {
	static objects = new ReportManagement();
}

export default Report;
