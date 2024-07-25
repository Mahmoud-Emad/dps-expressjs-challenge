export interface IReport {
	id: string;
	text: string;
	projectid: string;
}

export interface IProject {
	id: string;
	name: string;
	description: string;
	reports?: IReport[];
}

export interface ProjectManagementGetOptions {
	id: string;
}

export interface ProjectManagement {
	create: () => IProject;
	all: () => IProject[];
	update: (newValues: IProject) => IProject;
	get: (options: ProjectManagementGetOptions) => IProject;
}

export interface IResponse<T> {
	message?: string;
	status?: number;
	data?: T;
}
