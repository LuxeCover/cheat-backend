import http from 'http';
import expressApp from './app'

export default async function createAppServer() {
    const server = http.createServer(await expressApp());
    return server;
}