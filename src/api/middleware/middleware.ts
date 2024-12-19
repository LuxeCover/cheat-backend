import { Request, Response, NextFunction } from "express";
import { sendError } from "../../exceptions/base_exception";
import { verifyToken } from "../../utils/jwt";

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    const userId = verifyToken(req.token ?? '');
    if (!req.token) {
        return sendError('Authorization Error', 403,)
    }
    req.userId = Number.parseInt(userId) ?? ''
    next()
}

export const extractToken = (req: Request, res: Response, next: NextFunction) => {
    let userToken!: string;
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(' ');
        if (token.length === 2 && token[0].toLowerCase() === 'bearer') {
            userToken = token[1];
        }
    }
    req.token = userToken;
    next()
}