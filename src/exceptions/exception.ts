import { BaseException } from "./base_exception";

export class RouteNotFound extends BaseException {
    constructor(path: string, stack?: any) {
        super(400, `Route does not exist`, "ROUTE_NOT_FOUND", stack)
    }
}
