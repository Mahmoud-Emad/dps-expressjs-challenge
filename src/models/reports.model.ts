import type { IReport, IReportManagement, GetByIdOptions } from '../types';
import db from '../services/db.service';
import { v4 as uuidv4 } from 'uuid';

class ReportManagement implements IReportManagement {
	update(reportId: string, newValues: IReport): IReport | null {
		const report = this.get({ id: reportId });
		if (!report) {
			return null;
		}

		const sql =
			'UPDATE reports SET text = @text, projectid = @projectid WHERE id = @id';
		try {
			db.run(sql, {
				text: newValues.text,
				projectid: newValues.projectid,
				id: reportId,
			});
			newValues.id = reportId;
			return newValues;
		} catch {
			return null;
		}
	}

	get(options: GetByIdOptions): IReport | null {
		const result = db.query('SELECT * FROM reports WHERE id=@id', {
			id: options.id,
		});

		if (!result.length) {
			return null;
		}

		return result[0] as unknown as IReport;
	}

	delete(reportId: string): string | null {
		const report = this.get({ id: reportId });
		if (!report) {
			return null;
		}

		const dReportsSql = 'DELETE FROM reports WHERE id = @id';

		try {
			db.run(dReportsSql, {
				id: reportId,
			});

			return reportId;
		} catch {
			return null;
		}
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
			values.id = id;
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
