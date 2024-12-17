import winston from "winston";
import { ConsoleTransportInstance } from "winston/lib/winston/transports";
import config from '../config/index'

///for advanced logging
const transports: ConsoleTransportInstance[] = [];

if (config.NODE_ENV !== 'development') {
    transports.push(
        new winston.transports.Console()
    )
} else {
    transports.push(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.cli(),
                winston.format.splat(),
                winston.format.colorize()
            )
        })
    )
}

const LoggerInstance: winston.Logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.colorize({ colors: { info: 'blue', error: 'red', warn: 'yellow' } }),
        winston.format.timestamp({
            format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        winston.format.errors({ stack: true, }),
        winston.format.align(),
    ),
    transports
})

export default LoggerInstance;