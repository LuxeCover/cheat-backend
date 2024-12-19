import { PrismaClient } from "@prisma/client";
import { Inject, Service } from "typedi";
import { sendError } from "../../exceptions/base_exception";
@Service()
export class UserService {
    constructor(@Inject('prisma') private readonly prisma: PrismaClient) { }
    //get user profile details

    public async getUserDetails(userId: number) {
        const [userDetails, steamDetails] = await Promise.all([
            this.prisma.user.findFirst({ where: { id: userId } }),
            this.prisma.steamAccount.findFirst({ where: { userId: userId } })
        ]);
        if (!userDetails && !steamDetails) {
            return sendError('User not found', 404);
        }
        
        return { user_details: userDetails, steam_details: steamDetails }
    }
    /**
     * signOut
     */
    public signOut() {

    }

    /**
     * updateProfileDetails
     */
    public updateProfileDetails() {

    }
    //update user profile details
}