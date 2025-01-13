import express from "express";
import { isAuthenticated } from "../middlewares";
import { createNewList, getAllLists, deleteList } from "../controllers/tasks/lists";
import { isListOwner } from "../middlewares/tasks";


export default (router: express.Router) => {
    router.post('/lists', isAuthenticated, createNewList);
    router.get('/lists', isAuthenticated, getAllLists);
    router.delete('/lists/:id', isAuthenticated, isListOwner, deleteList);
}