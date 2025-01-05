import express from 'express';
import { get } from 'lodash';
import { createHabit, deleteHabitById, getHabitsByCreator, getHabitsCountByCreator } from '../db/habits/habits';

export const createNewHabit = async (req: express.Request, res: express.Response) => {
    try {
        const { name, description, icon, goal, frequency } = req.body;
        const creator = get(req, 'identity._id') as unknown as string;

        if (!name && !description && !icon && !goal && !frequency) {
            return res.sendStatus(400);
        }

        const habit = await createHabit({ name, description, icon, goal, frequency, creator });
        return res.status(200).json(habit).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getAllHabits = async (req: express.Request, res: express.Response) => {
    try {
        const creator = get(req, 'identity._id') as unknown as string;
        const limit = parseInt(get(req, 'query.limit') as string) || 10;
        const page = parseInt(get(req, 'query.page') as string) || 1;

        const totalCount = await getHabitsCountByCreator(creator);
        const habits = await getHabitsByCreator(creator, limit, page);

        const responseData = {
            habits: habits,
            count: totalCount
        }

        return res.status(200).json(responseData);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateHabits = async (req: express.Request, res: express.Response) => {
    try {
        const { name, description, icon, goal, frequency } = req.body;
  
        if (!name && !description && !icon && !goal && !frequency) {
            return res.sendStatus(400);
        }
  
      const habit = req.body.habit

      if(habit){
        habit.name = name;
        habit.description = description;
        habit.icon = icon;
        habit.goal = goal;
        habit.frequency = frequency;
        await habit.save();
      }else
          return res.sendStatus(404);
      
      return res.status(200).json(habit).end();
  
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
}

export const getHabit = async (req: express.Request, res: express.Response) => {
    try {

      const habit = req.body.habit
      
      return res.status(200).json(habit).end();
  
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
}

export const deleteHabit = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deletedHabit = await deleteHabitById(id);
  
        return res.json(deletedHabit);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

