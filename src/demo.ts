import { add, capitalize, formatNumber, Logger, type LogLevel } from './index';
import { config } from './config';

console.log('sum(typed):', add(2, 3));
console.log('capitalize(typed):', capitalize('hello'));

console.log('format(ok):', formatNumber(123.456)); // precision береться з APP_PRECISION

// ПОМИЛКА ТИПІВ (НАВМИСНО): 'verbose' не входить у 'silent' | 'info' | 'debug'
const logger = new Logger(config.LOG_LEVEL as LogLevel); // значення з .env пройшло валідацію zod

logger.info('Application started');
logger.debug('Extra debug info');
