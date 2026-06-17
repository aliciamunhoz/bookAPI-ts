import { Request } from 'express'

type LogContext = Record<string, unknown>

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null
}

const serializeError = (error: unknown): Record<string, unknown> => {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    }
  }

  if (isObject(error)) {
    return error
  }

  return { value: String(error) }
}

const writeLog = (
  level: 'info' | 'warn' | 'error',
  event: string,
  context?: LogContext
) => {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    event,
    ...context,
  }

  const output = JSON.stringify(entry)

  if (level === 'error') {
    console.error(output)
    return
  }

  if (level === 'warn') {
    console.warn(output)
    return
  }

  console.log(output)
}

export const logInfo = (event: string, context?: LogContext) => {
  writeLog('info', event, context)
}

export const logWarn = (event: string, context?: LogContext) => {
  writeLog('warn', event, context)
}

export const logError = (
  event: string,
  error: unknown,
  context?: LogContext
) => {
  writeLog('error', event, {
    ...context,
    error: serializeError(error),
  })
}

export const requestContext = (req: Request): LogContext => ({
  method: req.method,
  path: req.originalUrl,
  params: req.params,
  query: req.query,
  body: req.body,
})
