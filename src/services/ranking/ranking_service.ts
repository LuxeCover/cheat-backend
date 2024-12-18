import { PrismaClient } from "@prisma/client";
import { Inject, Service } from "typedi";

@Service()
export class RankingServices {
    constructor(@Inject('prisma') private readonly prisma: PrismaClient) { }

    /**
     * communityTopEarners
     */
    public communityTopEarners() {
        
    }
}