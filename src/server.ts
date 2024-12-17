import http from 'http';
import expressApp from './app'
import dependenciesInjectionLoaders from './loaders/dependency_injections';

export default async function createAppServer() {
    dependenciesInjectionLoaders();
    const server = http.createServer(await expressApp());
    return server;
}