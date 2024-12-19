import { Key } from '@prisma/client';
import Joi from 'joi';
import { Pagination } from './entities';


export const PaginationValidate = Joi.object<Pagination>({
    perPage: Joi.number().required(),
    page: Joi.number().required(),
})