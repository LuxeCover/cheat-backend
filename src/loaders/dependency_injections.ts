import { Container } from "typedi"
import LoggerInstance from "../utils/logger"
import { DiscordAuthService } from "../services/authentication/discord_auth"
import { prisma } from "./prisma_connection"
import { SteamAuthService } from "../services/authentication/steam_auth"
import { PayOutService } from "../services/payout/payout"




function dependenciesInjectionLoaders() {

    try {
        LoggerInstance.info('Dependencies Loading')
        Container.set('discordAuth', new DiscordAuthService(prisma));
        Container.set('steamAuth', new SteamAuthService(prisma));
        Container.set('payout', new  PayOutService(prisma))
        Container.set('logger', LoggerInstance)
        LoggerInstance.warn('Injection done')
    } catch (error) {
        LoggerInstance.error(`Uh error ${error}`);
        throw error;
    }
}

export default dependenciesInjectionLoaders;