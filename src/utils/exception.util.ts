import { HttpException, Logger, HttpStatus } from '@nestjs/common';

export function handleException(error: any, context: string, logger?: Logger) {
  if (error instanceof HttpException) {
    if (logger) {
      logger.error(`${context}: ${error.message}`, error.stack);
    }
    throw error;
  }

  if (logger) {
    logger.error(`${context}: Internal server error`, error.stack);
  }
  throw new HttpException(
    // 'Internal server error',
    context,
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
}
