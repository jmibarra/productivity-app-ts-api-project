import express from "express";
import { isAuthenticated } from "../middlewares";
import { createNewList } from "../controllers/tasks/lists";

export default (router: express.Router) => {
    router.post('/lists', isAuthenticated, createNewList);
}