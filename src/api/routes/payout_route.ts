import { Router } from 'express'
import asyncHandler from '../../utils/async_handler';
import Container from 'typedi';
import { responseFormat } from '../../utils/response_format';
import { SteamAuthService } from '../../services/authentication/steam_auth';
import { PayOutService } from '../../services/payout/payout';

const router = Router();


export default function payout(app: Router) {
    app.use('/payout', router);
    const discordAuth: PayOutService = Container.get('payout');

    router.get('/:userId', asyncHandler(async (req, res, next) => {
        const payout = await discordAuth.getPayouts(1);
        res.send(responseFormat("Request successful", payout)).status(200)
    }));


}

