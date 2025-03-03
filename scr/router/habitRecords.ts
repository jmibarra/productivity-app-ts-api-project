import express from "express";
import { isAuthenticated } from "../middlewares";
import { isHabitOwner } from "../middlewares/habits";
import { createNewHabitRecord, getHabitRecordDateRange, updateHabitRecord } from "../controllers/habitRecords";

export default (router: express.Router) => {
    router.post('/habit/:id/habit-records/', isAuthenticated, isHabitOwner, createNewHabitRecord);
    router.get('/habit/:id/habit-records/range/:startDate/:endDate', isAuthenticated, isHabitOwner, getHabitRecordDateRange);
    router.patch('/habit/:id/habit-records/:habitRecordId', isAuthenticated, isHabitOwner, updateHabitRecord);
}