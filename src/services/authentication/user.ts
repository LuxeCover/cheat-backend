import { PrismaClient } from "@prisma/client";
import { Inject, Service } from "typedi";
@Service()
export class UserService {
 constructor(@Inject('prisma') private readonly prisma: PrismaClient) { }
    //get user profile details
    /**
     * getUserDetails
     */
    public async getUserDetails() {

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