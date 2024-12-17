import DiscordOauth2 from "discord-oauth2";
import config from "../../config";
import { Service, Inject } from "typedi";
import { PrismaClient } from "@prisma/client";
@Service()
export class DiscordAuthService {
    constructor(@Inject('prisma') private readonly prisma: PrismaClient) { }

    public async discordAuthInit(): Promise<String> {
        const oauth = new DiscordOauth2({
            clientId: config.DISCORD_CLIENT_ID,
            clientSecret: config.DISCORD_CLIENT_SECRET,
            redirectUri: 'https://jesmotips.com',

        });
        const authUrl = oauth.generateAuthUrl({
            scope: ['email', 'identify'],
        });

        return authUrl;
    };

    public async discordCallBack(token: string) {
        const oauth2 = new DiscordOauth2();
        const user = await oauth2.getUser(token);
        const userCheck = await this.prisma.user.findFirst({ where: { discord_id: user.id } });
        if (userCheck) {
            await this.prisma.user.update({
                data: {
                    avatar: user.avatar,
                    email: user.email || '',
                    username: user.username,

                },
                where: { id: userCheck.id }
            })
        } else {
            await this.prisma.user.create({
                data: {
                    discord_id: user.id,
                    avatar: user.avatar,
                    email: user.email || '',
                    username: user.username,
                }
            })
        }

    }
}