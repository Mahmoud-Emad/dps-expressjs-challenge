import request from 'supertest';
import server from '../src/index';
import { IProject } from '../src/types';

let PROJECT_ID: string;

const AUTH_HEADER = 'Authorization';
const AUTH_TOKEN = 'Password123';
const BASE_URL = '/projects';

afterEach(async () => {
	await server.close();
});

describe('/project/', () => {
	const createProject = async (project: IProject) => {
		return request(server)
			.post(BASE_URL)
			.send(project)
			.set(AUTH_HEADER, AUTH_TOKEN)
			.expect('Content-Type', /json/)
			.expect(201);
	};

	const updateProject = async (id: string, project: IProject) => {
		return request(server)
			.put(`${BASE_URL}/${id}/`)
			.send(project)
			.set(AUTH_HEADER, AUTH_TOKEN)
			.expect('Content-Type', /json/)
			.expect(202);
	};

	const getProject = async (id: string) => {
		return request(server)
			.get(`${BASE_URL}/${id}`)
			.set(AUTH_HEADER, AUTH_TOKEN)
			.expect('Content-Type', /json/)
			.expect(200);
	};

	const deleteProject = async (id: string) => {
		return request(server)
			.delete(`${BASE_URL}/${id}`)
			.set(AUTH_HEADER, AUTH_TOKEN)
			.expect(204);
	};

	it('should create project', async () => {
		const newProject: IProject = {
			name: 'Test project',
			description: 'Just for testing',
		};
		const res = await createProject(newProject);
		expect(res.body.data).toHaveProperty('id');
		PROJECT_ID = res.body.data.id;
	});

	it('should update the created project', async () => {
		const updatedProject: IProject = {
			name: 'Test project 2',
			description: 'Just for testing 2',
		};
		const res = await updateProject(PROJECT_ID, updatedProject);
		expect(res.body.data).toHaveProperty('id');
		expect(res.body.data.id).toBe(PROJECT_ID);
	});

	it('should return all projects', async () => {
		const res = await request(server)
			.get(BASE_URL)
			.set(AUTH_HEADER, AUTH_TOKEN)
			.expect('Content-Type', /json/)
			.expect(200);
		expect(Array.isArray(res.body.data)).toBe(true);
		expect(res.status).toBe(200);
	});

	it('should return a specific project', async () => {
		const res = await getProject(PROJECT_ID);
		expect(res.body.data.id).toBe(PROJECT_ID);
	});

	it('should delete the created project', async () => {
		await deleteProject(PROJECT_ID);
	});

	it('should return 404 for a deleted project', async () => {
		await request(server)
			.get(`${BASE_URL}/${PROJECT_ID}`)
			.set(AUTH_HEADER, AUTH_TOKEN)
			.expect('Content-Type', /json/)
			.expect(404);
		PROJECT_ID = '';
	});
});
