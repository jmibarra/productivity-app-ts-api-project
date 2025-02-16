import express from 'express';

import { createUser, getUserByEmail } from '../db/users';
import { random, authentication} from '../helpers'

export const login = async (req: express.Request, res: express.Response) => {
    try{
        const {email, password} = req.body;

        if(!email || !password)
            return res.sendStatus(400);

        const user = await getUserByEmail(email).select('+authentication.salt + authentication.password');

        if(!user)
            return res.sendStatus(403);

        const expectedHash = authentication(user?.authentication?.salt, password);

        if(user.authentication?.password !== expectedHash){
            return res.sendStatus(403);
        }

        const salt = random()
        user.authentication.sessionToken = authentication(salt, user._id.toString())

        await user.save()

        res.cookie("PROD-APP-AUTH", user.authentication.sessionToken, {
            httpOnly: true,    // Evita acceso desde JS
            secure: true,      // Solo en HTTPS
            sameSite: "none",  // Permite cookies entre diferentes dominios
            maxAge: 24 * 60 * 60 * 1000, // 1 día
        });

        return res.status(200).json(user).end()

    }catch(error){
        console.log(error);
        return res.sendStatus(400)
    }
}

export const register =async (req:express.Request, res: express.Response) => {
    try{
        const {email, password, username, fullName, avatarUrl } = req.body;

        if(!email || !password )
            return res.sendStatus(400)

        const existinUser = await getUserByEmail(email);

        if(existinUser)
            return res.sendStatus(400)
        
        const salt = random()
        const user = await createUser({
            email,
            username: username ? username : email,
            fullName: fullName ? fullName : email.split('@')[0],
            avatarUrl: avatarUrl ? avatarUrl :'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
            authentication: {
                salt,
                password: authentication(salt,password)
            }
        })

        return res.status(200).json(user).end()

    }catch(error){
        console.log(error);
        return res.sendStatus(400)

    }
}