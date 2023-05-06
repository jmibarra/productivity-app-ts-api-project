import express from "express";
import { isAuthenticated, isNoteOwner, isTaskOwner } from "../middlewares";
import { createNewTask, deleteTask, getAllTasks, updateCompleted, updateTask } from "../controllers/tasks";

export default (router: express.Router) => {
    router.post('/tasks', isAuthenticated, createNewTask);
    router.get('/tasks', isAuthenticated, getAllTasks);
    router.delete('/tasks/:id', isAuthenticated, isTaskOwner, deleteTask);
    router.patch('/tasks/:id', isAuthenticated, isTaskOwner, updateTask);
    router.patch('/task/:id/completed', isAuthenticated, isTaskOwner, updateCompleted)
}