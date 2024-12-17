import express from 'express';

export default async function expressApp() {
    const app = express();
    app.get('/hello', (req, res) => {
        res.send({ 'test': "hello" })
    })

    return app;
}