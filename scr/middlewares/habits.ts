import express from 'express'
import { get, merge } from 'lodash';
import { getHabitById } from '../db/habits/habits';

export const isHabitOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {

        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as unknown as string;
    
        const habit = await getHabitById(id)

        if(!habit)
            return res.sendStatus(400);

        if (currentUserId.toString() !== habit.user_id.toString()) {
            return res.sendStatus(403);
        }

        req.body.habit = habit
    
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}