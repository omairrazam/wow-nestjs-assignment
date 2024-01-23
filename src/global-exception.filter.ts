import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;
    const exceptionName =
      exception instanceof Error
        ? exception.constructor.name
        : 'UnknownException';

    this.logger.error(
      `Exception caught: ${exception.message}`,
      exception.stack,
      exceptionName,
    );
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
