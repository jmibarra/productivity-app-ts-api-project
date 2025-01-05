import express from "express";
import { createNewHabit, deleteHabit, getAllHabits, getHabit, updateHabits } from "../controllers/habits";
import { isAuthenticated } from "../middlewares";
import { isHabitOwner } from "../middlewares/habits";

export default (router: express.Router) => {
    router.post('/habits',isAuthenticated, createNewHabit);
    router.get('/habits',isAuthenticated, getAllHabits);
    router.get('/habits/:id', isAuthenticated,isHabitOwner, getHabit);
    router.delete('/habits/:id', isAuthenticated,isHabitOwner, deleteHabit);
    router.patch('/habits/:id', isAuthenticated,isHabitOwner, updateHabits);
}