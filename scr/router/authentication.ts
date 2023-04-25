import express from 'express';

import { register } from '../controllers/authentication';
import router from '.';

export default (router: express.Router) => {
    router.post('auth/register', register);
}