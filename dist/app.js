"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
const compress = require("compression");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const database_1 = require("./database");
const token_1 = require("./middlewares/token");
const auth_1 = require("./middlewares/auth");
const not_found_1 = require("./middlewares/not-found");
const internal_error_1 = require("./middlewares/internal-error");
const auth_2 = require("./routes/auth");
const user_1 = require("./routes/user");
const insurance_1 = require("./routes/insurance");
dotenv.config();
const database = new database_1.Database(process.env.DB_URI, process.env.DB_USER, process.env.DB_PASS);
database
    .connect()
    .then(() => {
    const PORT = +process.env.PORT;
    const HOST = process.env.HOST;
    const app = express();
    app.use(helmet())
        .use(morgan('dev'))
        .use(hpp())
        .use(compress())
        .use(cors({ optionsSuccessStatus: 200 }))
        .use(bodyParser.json({ limit: '20mb' }))
        .use(bodyParser.urlencoded({ limit: '20mb', extended: true }))
        .use(cookieParser())
        .use(token_1.tokenMiddleware);
    app.get('/', (req, res) => res.json({ message: 'Please use /api/' }))
        .use('/api/auth', auth_2.authRouter)
        .use(auth_1.authMiddleware)
        .use('/api/users', user_1.userRouter)
        .use('/api/insurances', insurance_1.insuranceRouter);
    app.use(internal_error_1.internalErrorMiddleware)
        .use(not_found_1.notFoundMiddleware);
    console.log(`Connection to ${HOST}:${PORT}...`);
    const server = app.listen(PORT, HOST);
    server.on('error', (err) => {
        switch (err.code) {
            case 'EACCES':
                console.error(`${HOST}:${PORT} requires elevated privileges`);
                break;
            case 'EADDRINUSE':
                console.error(`${HOST}:${PORT} is already in use`);
                break;
            default:
                console.error('Error connecting ' + err);
                break;
        }
        database.disconnect()
            .then(() => console.log('Database connection closed'))
            .catch(err => console.error('Database disconnection error ' + err))
            .then(() => {
            console.error('Exiting with code 1');
            process.exit(1);
        });
    });
    const closeServers = (sig) => {
        console.log(`Closing servers (${sig}) ...`);
        server.close(_ => console.log('Express server closed'));
        database.disconnect()
            .then(_ => console.log('Database connection closed'))
            .catch(err => console.log('Database disconnection error ' + err));
    };
    process.on('SIGTERM', () => closeServers('SIGTERM'));
    process.on('SIGINT', () => closeServers('SIGINT'));
    process.on('uncaughtException', () => closeServers('uncaughtException'));
})
    .catch(err => {
    console.error('An error occurs while running express:');
    console.error(err);
    console.error('Exiting with code 1');
    process.exit(1);
});
