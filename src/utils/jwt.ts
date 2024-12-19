import jwt from "jsonwebtoken";
import config from "../config";
import ms from 'ms';
import LoggerInstance from "./logger";
import { DecodedToken } from "../interface/entities";

export const generateJwtToken = (userId: number): string => {
    const token = jwt.sign(
        {
            _id: userId,
        },
        config.JWT.secret,
        {
            expiresIn: ms(config.JWT.expiry)
        }
    )
    return token; 
}

export const verifyToken = (token: string) => {
    const payload = jwt.verify(token, config.JWT.secret,) as DecodedToken;
    return payload._id;
}