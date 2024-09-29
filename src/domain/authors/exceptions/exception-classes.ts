import { appExceptionsRegistry } from '@shared/modules/error/exceptions/app-exceptions-registry';
import { AppException } from '@shared/modules/error/exceptions/exception-classes/app.exception';
import { RegisterAppException } from '@shared/modules/error/decorators/register-app-exception/register-app-exception.decprator';
import { createErrCode } from '@shared/modules/error/utils/create-err-code.util';
import { HttpStatus } from '@nestjs/common';

const FLOW_ID = 2;

appExceptionsRegistry.registerFlow(FLOW_ID, 'Book Authors');

@RegisterAppException(
  createErrCode(FLOW_ID, HttpStatus.NOT_FOUND, 0),
  'Book Author is not found',
)
export class AuthorNotFoundException extends AppException {}
