import { Router } from 'express'
import asyncHandler from '../../utils/async_handler';
import Container from 'typedi';
import { responseFormat } from '../../utils/response_format';
import { PayOutService } from '../../services/payout/payout';
import { sendError } from '../../exceptions/base_exception';
import { PaginationValidate } from '../../interface/payout';

const router = Router();


export default function payoutRoute(app: Router) {
    app.use('/payout', router);
    const discordAuth: PayOutService = Container.get('payoutService');

    router.get('/get', asyncHandler(async (req, res, next) => {
        const validate = PaginationValidate.validate(req.query);
        if (validate.error) {
            return sendError(validate.error.message, 400);
        }
        const userId = req.userId;
        const payout = await discordAuth.getPayouts(userId, validate.value);
        res.send(responseFormat("Request successful", payout)).status(200)
    }));


}

