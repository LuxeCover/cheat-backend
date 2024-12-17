import { Router } from "express";
import authenticationRoute from "./authentication";

export default () => {
    const app = Router();
    authenticationRoute(app);

    return app;
}