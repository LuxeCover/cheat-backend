import { Earnings, Payout, PrismaClient } from "@prisma/client";
import { Inject, Service } from "typedi";
import { sendError } from "../../exceptions/base_exception";


@Service()
export class EarningService {
    constructor(@Inject('prisma') private readonly prisma: PrismaClient) { }

    /**
     * getEarnings
     */
    public getEarnings(userId: number) {

    }
    public async topEarnersList() {
        // const topEarners = await this.prisma.earnings.groupBy({
        //     by: ['userId'],
        //     _sum: {
        //         amount: true,
        //     },
        //     orderBy: {
        //         _sum: { amount: 'desc' }
        //     },
        // })

        // return topEarners;
        const earningsWithUser = await this.prisma.earnings.groupBy({
            by: ['userId'],
            _sum: {
                amount: true,
            },
            orderBy: {
                _sum: {
                    amount: 'desc',
                },
            },
        });

        const earningsWithUserDetails = await Promise.all(
            earningsWithUser.map(async (earning) => {
                const user = await this.prisma.user.findUnique({
                    where: { id: earning.userId },
                    select: {

                        username: true,

                    },
                });

                return {
                    user,
                    totalEarnings: earning._sum.amount,
                };
            })
        );
        return earningsWithUserDetails;

    }

    /**
     * createEarnings
     */
    public async createEarning(earning: Earnings) {
        const response = await this.prisma.earnings.create({
            data: earning
        });
        return response;
    }

}