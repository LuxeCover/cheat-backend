import { Container } from "typedi"
import LoggerInstance from "../utils/logger"
import { DiscordAuthService } from "../services/authentication/discord_auth"
import { prisma } from "./prisma_connection"
import { SteamAuthService } from "../services/authentication/steam_auth"
import { PayOutService } from "../services/payout/payout"
import { ServiceUtils } from "../services/utils/service_utils"
import { UserService } from "../services/authentication/user"
import { KeyService, } from "../services/keys/key_service"
import { EarningService } from "../services/earnings/earning_services"




function dependenciesInjectionLoaders() {

    try {
        LoggerInstance.info('Dependencies Loading')
        Container.set('discordAuth', new DiscordAuthService(prisma));
        Container.set('steamAuth', new SteamAuthService(prisma));
        Container.set('payoutService', new PayOutService(prisma))
        Container.set('serviceUtils', new ServiceUtils())
        Container.set('userService', new UserService(prisma))
        Container.set('keyService', new KeyService(prisma))
        Container.set('earningService', new EarningService(prisma))
        Container.set('logger', LoggerInstance)
        LoggerInstance.warn('Injection done')
    } catch (error) {
        LoggerInstance.error(`Uh error ${error}`);
        throw error;
    }
}

export default dependenciesInjectionLoaders;