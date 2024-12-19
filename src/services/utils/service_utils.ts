import { sendError } from "../../exceptions/base_exception";
import redisClient from "../../loaders/redis";


export class ServiceUtils {
    /**
     * redisInsert
     */
    public async redisCreate(key: any, value: any) {
        try {
            await redisClient.set(`tokens/${key}`, value, { EX: 120 })
        } catch (error) {
            sendError('Authentication failed, kindly try again', 403)
        }
    }

    /**
     * getRedisData
     */
    public async getRedisData(key: any) {
        const data = await redisClient.get(key);
        return data as string;
    }
}