import express from 'express';
import appRoutes from './api/routes/index'
import { routeNotFound } from './exceptions/exception_utils';
import errorMiddleware from './utils/error_handler';
import { prisma } from './loaders/prisma_connection';

export default async function expressApp() {
    const app = express();
    app.get('/hello', async (req, res) => {

        res.send({ 'test': 'helllo' })


    });
    app.use(express.json())
    app.use(appRoutes());
    app.use(routeNotFound);
    app.use(errorMiddleware);

    return app;
}