import { FastifyReply, FastifyRequest } from 'fastify';
import pino, { LevelWithSilent } from 'pino';

import {
  ILoggerOptions,
  LogFormat,
} from '@shared/modules/logger/interfaces/logger-options.interface';
import { ISerializedRequest } from '@shared/modules/logger/interfaces/serialized-request.interface';
import pinoPrettyTransport from '@shared/modules/logger/utils/pino-pretty-transport';

export function getDefaultLoggerConfig(
  level: LevelWithSilent,
  logFormat = LogFormat.JSON,
): ILoggerOptions {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return {
    pinoOptions: {
      level: level,
    },
    stream:
      logFormat === LogFormat.PRETTY
        ? pinoPrettyTransport()
        : pino.destination({ sync: false }),
    customLogLevel: function (_req, res): LevelWithSilent {
      const { statusCode } = res;

      if (statusCode >= 400 && statusCode < 500) {
        return 'warn';
      }

      if (statusCode >= 500) {
        return 'error';
      }

      if (statusCode >= 300 && statusCode < 400) {
        return 'debug';
      }

      return isDevelopment ? 'debug' : 'silent';
    },
    reqResSerializers: {
      req: req => serializeReq(req),
      res: reply => serializeRes(reply),
    },
  };
}

function serializeReq(req: FastifyRequest): ISerializedRequest {
  return {
    id: req.id,
    method: req.method,
    url: req.url,
    query: req.query,
    userAgent: req.headers['user-agent'] ?? req.headers['User-Agent'],
  };
}

function serializeRes(res: FastifyReply): any {
  return {
    statusCode: res.statusCode,
  };
}
