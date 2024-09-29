import { AppException } from '@shared/modules/error/exceptions/exception-classes/app.exception';
import { RegisterAppException } from '@shared/modules/error/decorators/register-app-exception/register-app-exception.decprator';
import { createErrCode } from '@shared/modules/error/utils/create-err-code.util';
import { appExceptionsRegistry } from '@shared/modules/error/exceptions/app-exceptions-registry';
import { HttpStatus } from '@nestjs/common';

const FLOW_ID = 1;
appExceptionsRegistry.registerFlow(FLOW_ID, 'Books');

@RegisterAppException(
  createErrCode(FLOW_ID, HttpStatus.NOT_FOUND, 1),
  'The book is not found',
)
export class BookNotFoundException extends AppException {}

@RegisterAppException(
  createErrCode(FLOW_ID, HttpStatus.CONFLICT, 1),
  'The book with the name is already exists',
)
export class BookWithTheNameIsAlreadyExistsException extends AppException {}

@RegisterAppException(
  createErrCode(FLOW_ID, HttpStatus.FORBIDDEN, 1),
  'The book is forbidden to view',
)
export class ForbiddenToViewBookException extends AppException {}
