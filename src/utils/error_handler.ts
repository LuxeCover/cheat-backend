import { NextFunction, Request, Response } from "express";

import LoggerInstance from "./logger";
import { responseFormat } from "./response_format";
import { Prisma } from "@prisma/client";
import { DiscordHTTPError } from "discord-oauth2";



function errorMiddleware(catchError: any, req: Request, res: Response, next: NextFunction) {
    let status = catchError.statusCode ? catchError.statusCode : 500;
    let errorMessage: string = catchError.message;
    const trace = process.env.NODE_ENV === 'development' ? catchError.stack : 'No data';
    if (catchError instanceof Prisma.PrismaClientKnownRequestError) {
        if (catchError.code === "P2002") {
            errorMessage = 'A user with this email already exists';
        } else {
            errorMessage = 'Error inserting data into the db'
        }
    } else if (catchError instanceof Prisma.PrismaClientUnknownRequestError) {

        errorMessage = 'Unknown error occurred';
    } else if (catchError instanceof Prisma.PrismaClientRustPanicError) {

        errorMessage = 'A Rust panic error occurred';
    } else if (catchError instanceof Prisma.PrismaClientInitializationError) {

        errorMessage = 'Failed to initialize Prisma client';
    } else if (catchError instanceof Prisma.PrismaClientValidationError) {
        errorMessage = 'Validation error';
    } else if (catchError instanceof DiscordHTTPError) {
        errorMessage = "Authentication error"
    }

    // else if (catchError instanceof jwt.JsonWebTokenError) {
    //     errorMessage = 'Invalid bearer token'
    //     status = 403;
    // }
    // else if (catchError instanceof jwt.TokenExpiredError) {
    //     errorMessage = 'Authorization token expired'
    //     status = 403;
    // }
    // else if (catchError instanceof jwt.NotBeforeError) {
    //     errorMessage = 'Authorization token expired'
    //     status = 403;
    // } LoggerInstance.error(errorMessage)
    res.status(status).send(responseFormat(errorMessage,));
}

export default errorMiddleware;