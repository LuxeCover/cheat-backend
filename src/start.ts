import 'reflect-metadata';
import createAppServer from "./server";
import LoggerInstance from './utils/logger';


async function startServer() {
    const server = await createAppServer();
    server.listen(5000, () => { }).on('error', (error) => {
        if (error.message === 'EADDRINUSE') {
            process.exit(1)
        } else {
            throw error;
        }
    })

}


startServer().then(() => {
    LoggerInstance.info('server is running');
}).catch((error) => {
    LoggerInstance.info(`server error ${error}`);
})