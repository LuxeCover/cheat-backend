import { NextFunction, Request, Response } from "express";
import { RouteNotFound } from "./exception";

export function routeNotFound(req: Request, res: Response, next: NextFunction) {
    try {
        next(new RouteNotFound(req.path))
    } catch (error) {
        next(error)
    }
}