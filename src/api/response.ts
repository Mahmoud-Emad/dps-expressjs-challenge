import { type IResponse } from '../types';
import { Response } from 'express';

class CustomResponse {
	static notFound<T>(res: Response, options: IResponse<T>): IResponse<T> {
		return res.json({
			message: options.message || 'Not Found',
			status: options.status || 404,
			data: options.data,
		}) as unknown as IResponse<T>;
	}
	static success<T>(res: Response, options: IResponse<T>): IResponse<T> {
		return res.json({
			message: options.message || 'Success',
			status: options.status || 200,
			data: options.data,
		}) as unknown as IResponse<T>;
	}
	static unauthorized<T>(res: Response, options: IResponse<T>): IResponse<T> {
		return res.json({
			message: options.message || 'Unauthorized',
			status: options.status || 401,
			data: options.data,
		}) as unknown as IResponse<T>;
	}
}

export default CustomResponse;
