export interface IReport {
	id?: string;
	text: string;
	projectid: string;
}

export interface IProject {
	id?: string;
	name: string;
	description: string;
	reports?: IReport[];
}

export interface GetByIdOptions {
	id: string;
}

export interface IProjectManagement {
	create: (values: IProject) => IProject | null;
	update: (projectId: string, newValues: IProject) => IProject | null;
	get: (options: GetByIdOptions) => IProject | null;
	all: () => IProject[];
}

export interface IReportManagement {
	create: (values: IReport) => IReport | null;
	update: (projectId: string, newValues: IReport) => IReport | null;
	get: (options: GetByIdOptions) => IReport | null;
	all: () => IReport[];
}

export interface IResponse<T> {
	message?: string;
	status?: number;
	data?: T;
}
