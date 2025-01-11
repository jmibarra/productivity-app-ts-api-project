import express from "express";
import { isAuthenticated } from "../middlewares";
import { createNewTask, deleteTask, getAllTasks, getTask, updateTask } from "../controllers/tasks";
import { isTaskOwner } from "../middlewares/tasks";

export default (router: express.Router) => {
    router.post('/tasks', isAuthenticated, createNewTask);
    router.get('/tasks', isAuthenticated, getAllTasks);
    router.get('/tasks/:id', isAuthenticated, isTaskOwner,getTask);
    router.delete('/tasks/:id', isAuthenticated, isTaskOwner, deleteTask);
    router.patch('/tasks/:id', isAuthenticated, isTaskOwner, updateTask);
}