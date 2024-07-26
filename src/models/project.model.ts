import type {
	IProject,
	GetByIdOptions,
	IProjectManagement,
	IReport,
} from '../types';
import db from '../services/db.service';
import { v4 as uuidv4 } from 'uuid';

class ProjectManagement implements IProjectManagement {
	create(values: IProject): IProject | null {
		const id = uuidv4();
		try {
			const sql =
				'INSERT INTO projects (id, name, description) VALUES (@id, @name, @description)';
			db.run(sql, {
				id: id,
				name: values.name,
				description: values.description,
			});
			values.id = id;
			return values as unknown as IProject;
		} catch {
			return null;
		}
	}

	update(projectId: string, newValues: IProject): IProject | null {
		const project = this.get({ id: projectId });
		if (!project) {
			return null;
		}

		const sql =
			'UPDATE projects SET name = @name, description = @description WHERE id = @id';
		try {
			db.run(sql, {
				name: newValues.name,
				description: newValues.description,
				id: projectId,
			});
			newValues.id = projectId;
			return newValues;
		} catch {
			return null;
		}
	}

	delete(projectId: string): string | null {
		const project = this.get({ id: projectId });
		if (!project) {
			return null;
		}

		const dReportsSql = 'DELETE FROM reports WHERE projectid = @id';
		const dProjectSql = 'DELETE FROM projects WHERE id = @id';

		try {
			db.run(dReportsSql, {
				id: projectId,
			});

			db.run(dProjectSql, {
				id: projectId,
			});
			return projectId;
		} catch {
			return null;
		}
	}

	all(): IProject[] {
		const projects = db.query('SELECT * FROM projects;') as IProject[];
		return projects || [];
	}

	get(options: GetByIdOptions): IProject | null {
		const reportsResult = db.query(
			'SELECT * FROM reports WHERE projectid = @id',
			{
				id: options.id,
			},
		);

		const projectResult = db.query('SELECT * FROM projects WHERE id=@id', {
			id: options.id,
		});

		if (!projectResult.length) {
			return null;
		}

		const project = projectResult[0] as unknown as IProject;
		const reports = (reportsResult as unknown as IReport[]) || [];

		project.reports = reports;

		return project;
	}
}

class Project {
	static objects = new ProjectManagement();
}

export default Project;
