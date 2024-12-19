import { Router } from "express";
import authenticationRoute from "./authentication_route";
import payoutRoute from "./payout_route";
import keysRoute from "./keys_route";
import earningsRoute from "./earnings_routes";

export default () => {
    const app = Router();
    authenticationRoute(app);
    payoutRoute(app);
    keysRoute(app);
    earningsRoute(app);
    return app;
}