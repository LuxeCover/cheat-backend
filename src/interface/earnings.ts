import { Earnings} from '@prisma/client';
import Joi from 'joi';


export const EarningsValidator = Joi.object<Earnings>({
    amount: Joi.number().required(),
    description: Joi.string(),
    userId: Joi.number().required(),
})