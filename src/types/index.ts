export type ReportType = {
	id: string;
	text: string;
	projectid: string;
};

export type ProjectType = {
	id: string;
	name: string;
	description: string;
	reports?: ReportType[];
};
