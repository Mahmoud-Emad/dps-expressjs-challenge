import type { IReport, IProject, ProjectManagementGetOptions } from '../types';
import db from '../services/db.service';

class ProjectManagement implements ProjectManagement {
	create(): IProject {
		return {
			id: '',
			description: '',
			name: '',
			reports: [],
		};
	}

	update(newValues: IProject) {
		return newValues;
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
