import type { IReport, IProject, ProjectManagementGetOptions } from '../types';

class Project {
	protected id: string;
	protected name: string;
	protected description: string;
	protected reports?: IReport[];

	objects: ProjectManagement;

	constructor(meta: IProject) {
		this.id = meta.id;
		this.name = meta.name;
		this.description = meta.description;
		this.reports = meta.reports;
		this.objects = new ProjectManagement(meta);
	}
}

class ProjectManagement extends Project implements ProjectManagement {
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
		return [];
	}

	get(options: ProjectManagementGetOptions): IProject {
		console.log(options);
		return {
			id: '',
			description: '',
			name: '',
			reports: [],
		};
	}
}

export default Project;
