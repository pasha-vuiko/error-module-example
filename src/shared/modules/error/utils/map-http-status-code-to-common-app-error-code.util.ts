import { HttpStatus } from '@nestjs/common';

import { TAppErrorCode } from '@shared/modules/error/exceptions/exception-classes/app.exception';

export function mapHttpStatusCodeToCommonAppErrorCode(
  httpCode: HttpStatus | number,
): TAppErrorCode {
  return `0.${httpCode}.0`;
}
