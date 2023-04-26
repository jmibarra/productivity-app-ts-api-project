import express from 'express'
import { get, merge } from 'lodash';

import { getUserBySessionToken  } from '../db/users';

export const isAuthenticaded = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
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