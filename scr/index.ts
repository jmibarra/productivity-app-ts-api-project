import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import router from './router';

const app = express();

app.use(cors({
    origin: (origin, callback) => {
        callback(null, true); // Permite cualquier origen
    },
    credentials: true,
}));


app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(443, () => {
    console.log('Server running')
})

const databaseUrl = process.env.MONGO_URL;

if (!databaseUrl) {
    console.error('MongoDB URL not found');
    process.exit(1);
}

mongoose.Promise = Promise;
mongoose.connect(databaseUrl);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router())
