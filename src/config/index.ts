import dotenv from 'dotenv';

const env = dotenv.config();

if (env.error) {
    throw new Error('Env file not found');
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development';


export default {
    PORT: parseInt(process.env.PORT ?? '5000', 10),
    NODE_ENV: process.env.NODE_ENV,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET:process.env.CLIENT_SECRET,
    STEAM_KEY: process.env.STEAM_KEY,
    REDIS_URL: process.env.REDIS_URL,
    JWT: {
        secret: process.env.JWT_SECRET ?? '',
        expiry: process.env.JWT_EXPIRY ?? ''
    }
}