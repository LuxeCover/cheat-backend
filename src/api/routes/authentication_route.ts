import { Router } from 'express'
import asyncHandler from '../../utils/async_handler';
import { DiscordAuthService } from '../../services/authentication/discord_auth';
import Container from 'typedi';
import { responseFormat } from '../../utils/response_format';
import { SteamAuthService } from '../../services/authentication/steam_auth';
import { generateJwtToken } from '../../utils/jwt';
import { ServiceUtils } from '../../services/utils/service_utils';
import { sendError } from '../../exceptions/base_exception';
import { nanoid } from 'nanoid'
import { isLoggedIn } from '../middleware/middleware';
import { UserService } from '../../services/authentication/user';


const router = Router();


export default function authenticationRoute(app: Router) {
    app.use('/auth', router);


    const serviceUtils: ServiceUtils = Container.get('serviceUtils');

    router.get('/discord', asyncHandler(async (req, res, next) => {
        const discordAuth: DiscordAuthService = Container.get('discordAuth');
        const url = await discordAuth.discordAuthInit();
        const authData = {
            'auth_link': url,
        }
        res.send(responseFormat('Request successful', authData)).status(200)
    }));


    router.post('/discord/callback', asyncHandler(async (req, res, next) => {
        const discordAuth: DiscordAuthService = Container.get('discordAuth');
        const token = req.query['code'] as string;
        const userId = await discordAuth.discordCallBack(token);
        const jwtToken = generateJwtToken(userId as number);
        const jwtKey = nanoid(6);
        await serviceUtils.redisCreate(jwtKey, jwtToken);
        res.redirect(`https://getpaidtocheat.com/${jwtKey}`)
    }));

    router.get('/steam', isLoggedIn, asyncHandler(async (req, res, next) => {
        const steamAuth: SteamAuthService = Container.get('steamAuth');
        const userId = req.userId;
        const url = await steamAuth.steamAuthInit(userId);
        const authData = {
            'auth_link': url,
        }
        res.send(responseFormat('Request successful', authData)).status(200)
    }));


    router.post('/steam/callback', asyncHandler(async (req, res, next) => {
        const steamAuth: SteamAuthService = Container.get('steamAuth');
        const token = req.query['code'] as string;
        if (!token) {
            sendError('Steam auth failed', 403)
        }
        const userId = Number.parseInt(req.query['userId'] as string);
        await steamAuth.steamCallBack(token, userId);
        res.redirect('https://getpaidtocheat.com/')
    }));

    router.get('/token', asyncHandler(async (req, res, next) => {
        const key = req.query['code'] as string;
        const jwtToken = await serviceUtils.getRedisData(`tokens/${key}`);
        if (!jwtToken) {
            sendError('Could not find token', 404)
        }
        res.json(responseFormat('Request successful', { token: jwtToken }));
    }))

    router.get('/profile', isLoggedIn, asyncHandler(async (req, res, next) => {
        const userService: UserService = Container.get('userService');
        const userId = req.userId;
        const response =  await  userService.getUserDetails(userId)
        res.json(responseFormat('Request successful', response));
    }));
}

