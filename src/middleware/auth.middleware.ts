import { NextFunction, Request, Response } from 'express';
import CustomResponse from '../api/response';
import dotenv from 'dotenv';

dotenv.config();

const AUTH_TOKEN = process.env.AUTH_TOKEN || 'Password123';

function authDefualtToken(req: Request, res: Response, next: NextFunction) {
	const authToken = req.headers.authorization;
	if (authToken === AUTH_TOKEN) {
		next();
		return;
	}

	return CustomResponse.unauthorized(res, {
		message: `Authentication required! Please include '${AUTH_TOKEN}' in the request header.`,
	});
}

export default authDefualtToken;
