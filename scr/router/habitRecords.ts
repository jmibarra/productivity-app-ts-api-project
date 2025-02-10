import express from "express";
import { isAuthenticated } from "../middlewares";
import { isHabitOwner } from "../middlewares/habits";
import { createNewHabitRecord, getHabitRecordDateRange } from "../controllers/habitRecords";

export default (router: express.Router) => {
    router.post('/habit-records', isAuthenticated, isHabitOwner, createNewHabitRecord);
    router.get('/habit-records/:habitId/', isAuthenticated, isHabitOwner, getHabitRecordDateRange);
}