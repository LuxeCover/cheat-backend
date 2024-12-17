import DiscordOauth2 from "discord-oauth2";
import config from "../../config";
import { Service, Inject } from "typedi";
import { PrismaClient } from "@prisma/client";
import SteamAuth from "node-steam-openid";

@Service()
export class SteamAuthService {
    constructor(@Inject('prisma') private readonly prisma: PrismaClient) { }

    public async steamAuthInit(): Promise<String> {
        const oauth = new SteamAuth(
            {
                apiKey: '',
                realm: '',
                returnUrl: ''
            }
        );
        const authUrl = oauth.getRedirectUrl();

        return authUrl;
    };

    public async steamCallBack(token: string) {
        const oauth = new SteamAuth(
            {
                apiKey: config.STEAM_KEY as string,
                realm: '',
                returnUrl: ''
            }
        );
        const user = await oauth.authenticate({})
        await this.prisma.steamAccount.create({
            data: {
                steam_id: user.steamid,
                name: user.name,
                profile: user.profile,
                username: user.username
            },
        })


    }
}