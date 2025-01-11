import express from 'express'
import { get } from 'lodash';
import { getTaskById } from '../db/tasks/tasks';
import { getListById } from '../db/tasks/lists';
export const isTaskOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {

        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as unknown as string;
    
        const task = await getTaskById(id)

        if(!task)
            return res.sendStatus(400);

        if (currentUserId.toString() !== task.creator) {
            return res.sendStatus(403);
        }

        req.body.task = task
    
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const isListOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {

        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as unknown as string;
    
        const list = await getListById(id)

        if(!list)
            return res.sendStatus(400);

        if (currentUserId.toString() !== list.creator) {
            return res.sendStatus(403);
        }

        req.body.list = list
    
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}