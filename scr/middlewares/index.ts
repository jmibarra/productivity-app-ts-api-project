import express from 'express'
import { get, merge } from 'lodash';

import { getUserBySessionToken  } from '../db/users';
import { getNoteById } from '../db/notes';
import { getTaskById } from '../db/tasks';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const sessionToken = req.cookies['PROD-APP-AUTH'];

        if(!sessionToken)
            return res.sendStatus(403);

        const existinUser = await getUserBySessionToken(sessionToken);

        if(!existinUser)
            return res.sendStatus(403);

        merge(req, {identity: existinUser});

        return next();
    }catch(error){
        console.log(error);
        return res.sendStatus(400);        
    }
}

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const { id } = req.params;
      const currentUserId = get(req, 'identity._id') as unknown as string;
  
      if (!currentUserId) {
        return res.sendStatus(400);
      }
  
      if (currentUserId.toString() !== id) {
        return res.sendStatus(403);
      }
  
      next();
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
}

export const isNoteOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {

        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as unknown as string;
    
        const note = await getNoteById(id)

        if(!note)
            return res.sendStatus(400);

        if (currentUserId.toString() !== note.creator) {
            return res.sendStatus(403);
        }

        req.body.note = note

        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

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
