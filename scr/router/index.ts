import express, { Router } from 'express';

import authentication from './authentication';
import users from './users';
import notes from './notes';
import tasks from './tasks';
import habits from './habits';
import lists from './lists';


const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    notes(router);
    tasks(router);
    habits(router);
    lists(router);
    
    return router;
}