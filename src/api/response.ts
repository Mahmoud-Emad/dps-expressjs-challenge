import { type IResponse } from '../types';
import { Response } from 'express';

class CustomResponse {
	// Private method to handle the response logic
	private static sendResponse<T>(
		res: Response,
		statusCode: number,
		message: string,
		data: T,
	): IResponse<T> {
		return res.status(statusCode).json({
			message,
			status: statusCode,
			data,
		}) as unknown as IResponse<T>;
	}

	static notFound<T>(res: Response, options?: IResponse<T>): IResponse<T> {
		return CustomResponse.sendResponse<T>(
			res,
			options?.status || 404,
			options?.message || 'Not Found',
			options?.data || ({} as T),
		);
	}

	static badRequest<T>(res: Response, options?: IResponse<T>): IResponse<T> {
		return CustomResponse.sendResponse<T>(
			res,
			options?.status || 400,
			options?.message || 'Bad Request',
			options?.data || ({} as T),
		);
	}

	static success<T>(res: Response, options?: IResponse<T>): IResponse<T> {
		return CustomResponse.sendResponse<T>(
			res,
			options?.status || 200,
			options?.message || 'Success',
			options?.data || ({} as T),
		);
	}

	static unauthorized<T>(
		res: Response,
		options?: IResponse<T>,
	): IResponse<T> {
		return CustomResponse.sendResponse<T>(
			res,
			options?.status || 401,
			options?.message || 'Unauthorized',
			options?.data || ({} as T),
		);
	}
}

export default CustomResponse;
