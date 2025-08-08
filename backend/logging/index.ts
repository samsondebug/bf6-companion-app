import pino from 'pino';

export const createLogger = (name: string) =>
  pino({ name, level: 'info' });
