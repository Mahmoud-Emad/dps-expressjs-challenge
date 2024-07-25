export interface IReport {
	id: string;
	text: string;
	projectid: string;
}

export interface IProject {
	id?: string;
	name: string;
	description: string;
	reports?: IReport[];
}

export interface ProjectManagementGetOptions {
	id: string;
}

export interface IProjectManagement {
	create: (values: IProject) => IProject | null;
	update: (projectId: string, newValues: IProject) => IProject | null;
	get: (options: ProjectManagementGetOptions) => IProject | null;
	all: () => IProject[];
}

export interface IResponse<T> {
	message?: string;
	status?: number;
	data?: T;
}
