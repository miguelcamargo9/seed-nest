import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const driverError = exception.driverError as unknown as { code: string };

    if (driverError.code === 'ER_DUP_ENTRY') {
      const duplicateValueMatch = exception.message.match(
        /Duplicate entry '(.*)' for key/,
      );
      const duplicateValue = duplicateValueMatch ? duplicateValueMatch[1] : '';
      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Duplicate entry: ${duplicateValue}. This value already exists.`,
        error: 'Bad Request',
      });
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Internal server error`,
        error: 'Internal Server Error',
      });
    }
  }
}
