import express from 'express';
import { get } from 'lodash';
import { createList, deleteListById, getLists, getNextListOrder } from '../../db/tasks/lists';

export const createNewList = async (req: express.Request, res: express.Response) => {
    try{
        const { name, icon, color } = req.body;
        const creator = get(req, 'identity._id') as unknown as string;

        if (!name)
            return res.sendStatus(400);

        let finalOrder = await getNextListOrder(creator);
        const list = await createList({
            name,
            icon,
            color,
            finalOrder,
            creator
        });

        return res.status(200).json(list).end()

    }catch(error){
        console.log(error);
        return res.sendStatus(400)
    }
}

export const getAllLists = async (req: express.Request, res: express.Response) => {
    try {
        const creator = get(req, 'identity._id') as unknown as string;
        const lists = await getLists(creator);
        return res.status(200).json(lists).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteTask = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deletedTask = await deleteListById(id);
  
        return res.json(deletedTask);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}