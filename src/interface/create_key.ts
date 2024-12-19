import { Key } from '@prisma/client';
import Joi from 'joi';


export const CreateKey = Joi.object<Key>({
    key: Joi.string().required(),
    game: Joi.string().required(),
    expiresAt: Joi.date().required()
}).meta({ className: "CreateKey" })


export const RedeemKey = Joi.object({
    keyId: Joi.number().required()
})

export const Pagination1 = Joi.object({
    perPage: Joi.number().required(),
    page: Joi.number().required(),
})