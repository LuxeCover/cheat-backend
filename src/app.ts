import express from 'express';
import appRoutes from './api/routes/index'
import { routeNotFound } from './exceptions/exception_utils';
import errorMiddleware from './utils/error_handler';
import cors from 'cors';
import { extractToken } from './api/middleware/middleware';

declare global {
    namespace Express {
        interface Request {
            token?: string,
            userId: number
        }
    }
}
export default async function expressApp() {
    const app = express();
    app.get('/hello', async (req, res) => {

        res.send({ 'test': 'helllo' })

    });
    app.use(cors())
    app.use(express.json())
    app.use(extractToken)
    app.use(appRoutes());
    app.use(routeNotFound);
    app.use(errorMiddleware);

    return app;
}