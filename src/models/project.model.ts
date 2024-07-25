import type { IReport, IProject, ProjectManagementGetOptions } from '../types';
import db from '../services/db.service';

class ProjectManagement implements ProjectManagement {
	create(values: IProject): IProject | null {
		try {
			const sql =
				'INSERT INTO projects (id, name, description) VALUES (@id, @name, @description)';
			db.run(sql, {
				id: values.id,
				name: values.name,
				description: values.description,
			});

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

	all(): IProject[] {
		const projects = db.query('SELECT * FROM projects;') as IProject[];
		return projects || [];
	}

	get(options: ProjectManagementGetOptions): IProject | null {
		const result = db.query('SELECT * FROM projects WHERE id=@id', {
			id: options.id,
		});

		if (!result.length) {
			return null;
		}

		return result as unknown as IProject;
	}
}

class Project {
	protected id: string;
	protected name: string;
	protected description: string;
	protected reports?: IReport[];

	static objects = new ProjectManagement();

	constructor(meta: IProject) {
		this.id = meta.id;
		this.name = meta.name;
		this.description = meta.description;
		this.reports = meta.reports;
	}
}

export default Project;
