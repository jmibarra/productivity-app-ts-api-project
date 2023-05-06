import express from 'express';
import { getUserBySessionToken } from '../db/users';
import { createTask, deleteTaskById, getTasksByCreator, getTaskById } from '../db/tasks'
import { get } from 'lodash';

export const createNewTask = async (req: express.Request, res: express.Response) => {
    try{
        const { title, description, completed, color, priority, dueDate, list } = req.body;

        const creator = get(req, 'identity._id') as unknown as string;

        const createdAt = new Date();
        const updatedAt = new Date();

        if (!title && !description && !completed && !color && !dueDate && !priority)
            return res.sendStatus(400);

        //Ver como era la quick task que no tiene varios como oblogatios
        const task = await createTask({
            title,
            description,
            completed,
            color,
            createdAt,
            updatedAt,
            creator,
            dueDate,
            priority,
            list
        });

        return res.status(200).json(task).end()

    }catch(error){
        console.log(error);
        return res.sendStatus(400)

    }
} 

export const getAllTasks = async (req: express.Request, res: express.Response) => {
    try {

        const creator = get(req, 'identity._id') as unknown as string;
        const tasks = await getTasksByCreator(creator);

        const responseData = {
            tasks: tasks,
            count: tasks.length
        }
        
        return res.status(200).json(responseData);

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const deleteTask = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deletedTask = await deleteTaskById(id);
  
        return res.json(deletedTask);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateTask = async (req: express.Request, res: express.Response) => {
    try {
      const { title, description, completed, color, dueDate, priority, list } = req.body;
  
      if (!title && !description && completed === undefined && !color && !dueDate && !priority && !list) {
        console.log("entra")
            return res.sendStatus(400);
      }
  
      const task = req.body.task

      if(task){
            task.title = title ? title : task.title;
            task.description = description ? description : task.description;
            task.completed = completed !== undefined ? completed : task.completed;
            task.color = color ? color : task.color;
            task.dueDate = dueDate ? dueDate: task.dueDate;
            task.priority = priority ? priority : task.priority;
            task.list = list ? list : task.list;
            task.updatedAt = new Date();
            await task.save();
      }else
          return res.sendStatus(404);
      
      return res.status(200).json(task).end();
  
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
}