
import { Router } from 'express'
import asyncHandler from '../../utils/async_handler';
import Container from 'typedi';
import { responseFormat } from '../../utils/response_format';

import { sendError } from '../../exceptions/base_exception';
import { EarningService } from '../../services/earnings/earning_services';
import { EarningsValidator } from '../../interface/earnings';
import { isLoggedIn } from '../middleware/middleware';

const router = Router();


export default function earningsRoute(app: Router) {
    app.use('/earning', router);
    const earningService: EarningService = Container.get('earningService');

    router.get('/topEarners',isLoggedIn, asyncHandler(async (req, res, next) => {
        // const validate = EarningsValidator.validate(req.query);
        // if (validate.error) {
        //     return sendError(validate.error.message, 400);
        // }
        // const userId = req.userId;
        const earners = await earningService.topEarnersList();
        res.send(responseFormat("Request successful", earners)).status(200)
    }));


    router.post('/create', asyncHandler(async (req, res, next) => {
        const validate = EarningsValidator.validate(req.body);
        if (validate.error) {
            return sendError(validate.error.message, 400);
        }
        // const userId = req.userId;
        const response = await earningService.createEarning(validate.value);
        res.send(responseFormat('Earning created', response));
    }))


}

