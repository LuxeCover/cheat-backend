import { Router } from "express";
import authenticationRoute from "./authentication";
import payout from "./payout_route";

export default () => {
    const app = Router();
    authenticationRoute(app);
    payout(app)
    return app;
}