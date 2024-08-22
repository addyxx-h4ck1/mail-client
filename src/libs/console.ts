import winston from 'winston';

export const consoleLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.cli()
  ),
  transports: [new winston.transports.Console()],
});
