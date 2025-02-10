import express from "express";
import { isAuthenticated } from "../middlewares";
import { isHabitOwner } from "../middlewares/habits";
import { createNewHabitRecord } from "../controllers/habitRecords";

export default (router: express.Router) => {
    router.post('/habit-records', isAuthenticated, isHabitOwner, createNewHabitRecord);
}