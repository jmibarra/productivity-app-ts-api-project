import express from "express";
import { isAuthenticated } from "../middlewares";
import { isHabitOwner } from "../middlewares/habits";
import { createNewHabitRecord, getHabitRecordDateRange } from "../controllers/habitRecords";

export default (router: express.Router) => {
    router.post('/habit/:id/habit-records/', isAuthenticated, isHabitOwner, createNewHabitRecord);
    router.get('/habit/:id/habit-records/range/:startDate/:endDate', isAuthenticated, isHabitOwner, getHabitRecordDateRange);
}