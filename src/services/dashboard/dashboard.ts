import { PrismaClient } from "@prisma/client";
import { Inject, Service } from "typedi";

@Service()
export class DashboardService{
      constructor(@Inject('prisma') private readonly prisma: PrismaClient) { }

    /**
     * getDashboardData
     */
    public getDashboardData(userId:string) {
        
    }
}