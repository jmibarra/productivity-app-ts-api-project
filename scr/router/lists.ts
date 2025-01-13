import express from "express";
import { isAuthenticated } from "../middlewares";
import { createNewList, getAllLists } from "../controllers/tasks/lists";
import { isListOwner } from "../middlewares/tasks";
import { deleteListById } from "../db/tasks/lists";

export default (router: express.Router) => {
    router.post('/lists', isAuthenticated, createNewList);
    router.get('/lists', isAuthenticated, getAllLists);
    router.delete('/lists/:id', isAuthenticated, isListOwner, deleteListById);
}