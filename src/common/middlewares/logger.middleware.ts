import { Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const logger = new Logger('LoggerMiddleware');

    logger.log(`Method: ${req.method}, URL: ${req.url}`);

    next();
  }
}
