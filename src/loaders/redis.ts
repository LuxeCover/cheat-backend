import { createClient } from "redis";
import config from "../config";
import LoggerInstance from "../utils/logger";

const redisClient = createClient({ url: config.REDIS_URL });

redisClient.on('error', (error) => {
    LoggerInstance.warn(`Redis error ${error}`)
})

redisClient.connect().then(()=>{
    LoggerInstance.info('Redis connected')
});


export default redisClient;