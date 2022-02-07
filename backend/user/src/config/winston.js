const { format, addColors, createLogger, transports } = require('winston');

const customLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'blue',
  http: 'green',
  verbose: 'magenta',
  debug: 'white'
};

addColors(colors);

const defaultLevel = () => {
  const enviroment = process.env.NODE_ENV || 'development';
  const isDevelopment = enviroment === 'developement';
  return isDevelopment ? 'debug' : 'http';
};

const customFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  format.printf(
    ({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`
  )
);

const customTransports = [
  new transports.Console({ format: format.colorize({ all: true }) }),
  new transports.File({ filename: './logs/combined.log' }),
  new transports.File({ filename: './logs/error.log', level: 'error' })
];

const logger = createLogger({
  level: defaultLevel(),
  levels: customLevels,
  format: customFormat,
  transports: customTransports
});

module.exports = logger;
