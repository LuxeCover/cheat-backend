import createAppServer from "./server";


async function startServer() {
    const server = await createAppServer();
    server.listen(4000, () => { }).on('error', (error) => {
        if (error.message === 'EADDRINUSE') {
            process.exit(1)
        } else {
            throw error;   
        }
    })

}


startServer().then(() => {
    console.log('server is running');
}).catch((error) => {
    console.log('server is running');
})