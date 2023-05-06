import express from 'express';
import { createTask, deleteTaskById, getTasksByCreator, getTaskById, getTasksCountByCreator } from '../db/tasks'
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
        const limit = parseInt(req.query.limit as string) ?? 10;
        const page = parseInt(req.query.page as string) ?? 1;

        const totalCount = await getTasksCountByCreator(creator); // Obtener el recuento total de documentos
        const tasks = await getTasksByCreator(creator, limit, page);

        const responseData = {
            tasks: tasks,
            count: totalCount
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
      const { title, description, completed, color, dueDate, priority, list, labels } = req.body;
  
      if (!title && !description && completed === undefined && !color && !dueDate && !priority && !list && !labels) {
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
            task.labels = labels ? labels : task.labels;
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

export const getTask = async (req: express.Request, res: express.Response) => {
    try {

      const task = req.body.task
      
      return res.status(200).json(task).end();
  
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
}