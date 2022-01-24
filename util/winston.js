const { createLogger, format, transports } = require('winston');
const path = require("path");
const { combine, timestamp, label, prettyPrint } = format;
const winston = require('winston')
require('winston-daily-rotate-file');
const myCustomLevels = {
    levels: {
        trace: 9,
        input: 8,
        verbose: 7,
        prompt: 6,
        debug: 5,
        info: 4,
        data: 3,
        help: 2,
        warn: 1,
        error: 0,
    },
    colors: {
        trace: 'magenta',
        input: 'grey',
        verbose: 'cyan',
        prompt: 'grey',
        debug: 'blue',
        info: 'green',
        data: 'grey',
        help: 'cyan',
        warn: 'yellow',
        error: 'red',
    },
};
global.log = winston.createLogger({
    format: combine(
        timestamp(),
        prettyPrint()
    ),
    levels: myCustomLevels.levels,
    transports: [
        new winston.transports.DailyRotateFile({
            filename: path.join('log', `/%DATE%.log`),
            datePattern: 'DD-MM-YYYY',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
    ],
});
if (process.env.NODE_ENV !== 'production') {
    log.add(
        new winston.transports.Console({
            level: 'debug',
            timestamp: true,
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
                winston.format.timestamp(),
                winston.format.printf((info) => {
                    const {
                        timestamp, level, message, ...args
                    } = info;
                    const ts = timestamp.slice(0, 19).replace('T', ' ');
                    return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
                }),
            ),
        }),
    );
}