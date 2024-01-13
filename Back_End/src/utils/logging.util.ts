import winston, { format, transports } from 'winston';
// import 'winston-daily-rotate-file';
import 'winston-mongodb';

const { combine, timestamp, json } = format;
// const fileRotateTransport = new transports.DailyRotateFile({
//   filename: `src/logs/rotate-%DATE%.log`,
//   datePattern: 'YYYY-MM-DD-HH-mm', // Use 'YYYY-MM-DD-HH-mm' to rotate logs every minute
//   maxSize: '2k', // Optional: Maximum log file size before rotation
//   // maxFiles: '1m', // Optional: Maximum log files to keep (1 minute of logs)
// });

const errorFilter = winston.format((info, opts) => {
  return info.level === 'error' ? info : false;
});

const infoFilter = winston.format((info, opts) => {
  return info.level === 'info' ? info : false;
});

const customFormat = format.printf(({ level, message, ...metadata }) => {
  let msg = `${new Date().toISOString()} [${level}]: ${message} `;

  if (Object.keys(metadata).length > 0) {
    msg += JSON.stringify(metadata);
  }

  return msg;
});

export const logger = winston.createLogger({
  level: 'debug',
  format: format.combine(
    format.timestamp({
      format: 'yyyy-MM-dd hh:mm:ss',
    }),
    format.json(),
    format.prettyPrint(),
  ),
  transports: [
    // new winston.transports.File({
    //     filename: './src/logs/all.log',
    //     format: combine( timestamp({
    //         format: "MMM-DD-YYYY HH:mm:ss",
    //     }), json()),
    // }),
    // new winston.transports.File({
    //     filename: './src/logs/error.log',
    //     level: 'error',
    //     format: combine(errorFilter(), timestamp({
    //         format: "MMM-DD-YYYY HH:mm:ss",
    //     }), json()),
    // }),
    // new winston.transports.File({
    //     filename: './src/logs/info.log',
    //     level: 'info',
    //     format: combine(infoFilter(), timestamp({
    //         format: "MMM-DD-YYYY HH:mm:ss",
    //     }), json()),
    // }),
    // fileRotateTransport,
    new transports.MongoDB({
      level: 'info',
      //mongo database connection link
      db: 'mongodb+srv://duccao:N0F4pX6q38f2D5u7@db-mongodb-sgp1-24196-d65fd749.mongo.ondigitalocean.com/ads_management_log?tls=true&authSource=admin&replicaSet=db-mongodb-sgp1-24196',
      options: {
        useUnifiedTopology: true,
      },
      // A collection to save json formatted logs
      collection: 'ads_management_log',
      format: format.combine(format.timestamp(), format.timestamp(), format.colorize(), customFormat, format.json()),
    }),
  ],
});
