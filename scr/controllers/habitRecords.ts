import express from 'express';
import { get } from 'lodash';
import { createHabitRecord } from '../db/habits/habit_records';

export const createNewHabitRecord = async (req: express.Request, res: express.Response) => {
    try {
        const { habitId, date, progress, notes } = req.body;
        const creator = get(req, 'identity._id') as unknown as string;

        if (!habitId && !date && !progress) {
            return res.sendStatus(400);
        }

        const habit = await createHabitRecord({ habitId, date, progress, notes, creator });
        return res.status(200).json(habit).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}