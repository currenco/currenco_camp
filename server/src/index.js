import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import logger from './utils/logger.js';
import connectDB from './db/db.js';

dotenv.config({
    path: './.env',
});

const app = express();
const morganFormat = ':method :url :status :response-time ms';

app.use(
    morgan(morganFormat, {
        stream: {
            write: (message) => {
                const logObject = {
                    method: message.split(' ')[0],
                    url: message.split(' ')[1],
                    status: message.split(' ')[2],
                    responseTime: message.split(' ')[3],
                };
                logger.info(JSON.stringify(logObject));
            },
        },
    }),
);

const PORT = process.env.PORT || 8080;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            logger.info(`App is listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        logger.error('MongoDB Connection error', err);
    });
