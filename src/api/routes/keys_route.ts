import { Router } from 'express'
import asyncHandler from '../../utils/async_handler';
import Container from 'typedi';
import { responseFormat } from '../../utils/response_format';
import { Pagination } from '../../interface/entities';
import { KeyService } from '../../services/keys/key_service';
import { CreateKey, RedeemKey } from '../../interface/create_key';
import { sendError } from '../../exceptions/base_exception';
import { isLoggedIn } from '../middleware/middleware';
import { PaginationValidate } from '../../interface/payout';

const router = Router();


export default function keysRoute(app: Router) {
    app.use('/key', router);
    const keyService: KeyService = Container.get('keyService');
    /// create key
    router.post('/create', asyncHandler(async (req, res, next) => {
        const validate = CreateKey.validate(req.body);
        if (validate.error) {
            return sendError(validate.error.message, 400);
        }
        const key = await keyService.createKey(validate.value);
        res.send(responseFormat("Created successful", key)).status(201)
    }));

    router.post('/redeem', isLoggedIn, asyncHandler(async (req, res, next) => {
        const validate = RedeemKey.validate(req.body);
        const userId = req.userId;
        if (validate.error) return sendError(validate.error.message, 400);
        const redeemedKey = await keyService.redeemKey(validate.value.keyId, userId);
        res.send(responseFormat("Redeemed Successfully", redeemedKey)).status(201)
    }))

    router.get('/getKeys', isLoggedIn, asyncHandler(async (req, res, next) => {
        const validate = PaginationValidate.validate(req.query);
        if (validate.error) {
            return sendError(validate.error.message, 400);
        }
        const userId = req.userId;
        const response = await keyService.getRedeemedKeys(userId, validate.value);
        res.send(responseFormat("Request Successful", response))
    }))


}

