import express from "express";
import { isAuthenticated, isNoteOwner } from "../middlewares";
import { createNewTask, deleteTask, getAllTasks, updateTask } from "../controllers/tasks";

export default (router: express.Router) => {
    router.post('/tasks', isAuthenticated, createNewTask);
    router.get('/tasks', isAuthenticated, getAllTasks);
    router.delete('/tasks/:id', isAuthenticated, isNoteOwner, deleteTask);
    router.patch('/tasks/:id', isAuthenticated, isNoteOwner, updateTask);
}