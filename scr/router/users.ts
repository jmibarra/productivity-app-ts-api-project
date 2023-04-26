import express, { Router } from "express";

import { getAllUsers } from "../controllers/users";
import { isAuthenticaded } from "../middlewares";

export default (router: express.Router) => {
    router.get('/users', isAuthenticaded, getAllUsers);
}