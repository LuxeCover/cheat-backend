import { Router } from 'express'
import asyncHandler from '../../utils/async_handler';
import { DiscordAuthService } from '../../services/authentication/discord_auth';
import Container from 'typedi';
import { responseFormat } from '../../utils/response_format';
import { SteamAuthService } from '../../services/authentication/steam_auth';

const router = Router();


export default function authenticationRoute(app: Router) {
    app.use('/auth', router);
    const discordAuth: DiscordAuthService = Container.get('discordAuth');
    const steamAuth: SteamAuthService = Container.get('steamAuth');

    router.get('/discord', asyncHandler(async (req, res, next) => {
        const url = await discordAuth.discordAuthInit();
        const authData = {
            "auth_link": url,
        }
        res.send(responseFormat("Sign In with this link", authData)).status(200)
    }));


    router.post('/discord/callback', asyncHandler(async (req, res, next) => {
        const token = req.query['code'] as string;
        console.log(token);
        await discordAuth.discordCallBack(token);
        res.redirect('https://getpaidtocheat.com/')
    }));
    router.get('/steam', asyncHandler(async (req, res, next) => {
        const url = await steamAuth.steamAuthInit();
        const authData = {
            "auth_link": url,
        }
        res.send(responseFormat("Sign In with this link", authData)).status(200)
    }));


    router.post('/steam/callback', asyncHandler(async (req, res, next) => {
        const token = req.query['code'] as string;
        console.log(token);
        await steamAuth.steamCallBack(token);
        res.redirect('https://getpaidtocheat.com/')
    }));
}

