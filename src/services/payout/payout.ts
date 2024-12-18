import { Payout, PrismaClient } from "@prisma/client";
import { Inject, Service } from "typedi";
import { sendError } from "../../exceptions/base_exception";
import { last } from "lodash";
import { send } from "process";

@Service()
export class PayOutService {
    constructor(@Inject('prisma') private readonly prisma: PrismaClient) { }

    /**
     * payout balance
     */
    public async getPayouts(userId: number) {

        const [totalEarnings, lastPayout, payoutBalance, payouts] = await Promise.all([
            this.prisma.earnings.aggregate({
                _sum: {
                    amount: true,
                },
                where: {
                    userId: userId,
                },
            }),
            this.prisma.payout.findFirst({
                where: {
                    userId: userId,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            this.prisma.earnings.aggregate({
                _sum: {
                    amount: true,
                },
                where: {
                    userId: userId
                }
            }),
            this.prisma.payout.findMany({
                where: { userId: userId },
                orderBy: { createdAt: 'desc' },
            })
        ]);
        return {
            total_earnings: totalEarnings._sum.amount ?? 0,
            last_payout: lastPayout?.amount ?? 0,
            payout_balance: payoutBalance._sum.amount ?? 0,
            payouts: payouts
        }
    }

    /**
     * createPayout
     */
    public async createPayout(earningId: number) {
        const earning = await this.prisma.earnings.findFirst({
            where: { id: earningId,  }
        })


    }

}