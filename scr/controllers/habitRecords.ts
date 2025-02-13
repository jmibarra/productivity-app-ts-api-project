import express from 'express';
import { get } from 'lodash';
import { createHabitRecord, getHabitRecordByHabitIdAndDateRange } from '../db/habits/habit_records';

export const createNewHabitRecord = async (req: express.Request, res: express.Response) => {
    try {
        const { date, progress, notes } = req.body;

        const habit = req.body.habit
        const creator = get(req, 'identity._id') as unknown as string;

        if ( !date && !progress) {
            return res.sendStatus(400);
        }

        const habitRecord = await createHabitRecord({ habit_id: habit._id, date, progress, notes, creator });
        return res.status(200).json(habitRecord).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getHabitRecordDateRange = async (req: express.Request, res: express.Response) => {
    try {
        const habit = req.body.habit
        const startDate = new Date(req.params.startDate);
        const endDate = new Date(req.params.endDate);

        const habitRecords = await getHabitRecordByHabitIdAndDateRange(habit._id, startDate, endDate);
        return res.status(200).json(habitRecords).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}