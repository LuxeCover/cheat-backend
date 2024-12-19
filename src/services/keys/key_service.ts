import { Key, PrismaClient } from "@prisma/client";
import { Inject, Service } from "typedi";
import { sendError } from "../../exceptions/base_exception";
import { Pagination } from "../../interface/entities";
@Service()
export class KeyService {
    constructor(@Inject('prisma') private readonly prisma: PrismaClient) { }

    /**
     * createKey
     */
    public async createKey(key: Key) {
        const response = await this.prisma.key.create({
            data: key
        })
        return response;
    }

    /**
     *   redeemKey
     */
    public async redeemKey(keyId: number, userId: number) {
        const currentDate = new Date()
        console.log(keyId)
        const key = await this.prisma.key.findFirst({ where: { id: keyId, expiresAt: { lt: currentDate } } })
        if (!key) {
            return sendError('Key does not exist', 403)
        }
        const checkIfRedeemed = await this.prisma.redeemedKey.findFirst({ where: { keyId: keyId } })
        if (checkIfRedeemed) return sendError('You have redeemed this key already', 403)
        const redeemedKey = await this.prisma.redeemedKey.create({
            data: {
                keyId: key.id,
                userId: userId,
            }
        });
        return redeemedKey;
    }

    /**
     * getRedeemedKeys
     */
    public async getRedeemedKeys(userId: number, pagination: Pagination) {
        const redeemedKeys = await this.prisma.redeemedKey.findMany({
            where: { userId: userId },
            orderBy: { createdAt: 'desc' },
            skip: ((pagination.page ?? 1) - 1) * pagination.perPage,
            take: pagination.perPage
        });
        return { keys: redeemedKeys, pagination: pagination };
    }

}