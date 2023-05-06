import express from 'express';
import { getUserBySessionToken } from '../db/users';
import { createTask, deleteTaskById, getTasksByCreator, getTaskById } from '../db/tasks'

export const createNewTask = async (req: express.Request, res: express.Response) => {
    try{
        const { title, description, completed, color, priority, dueDate, list } = req.body;

        const sessionToken = req.cookies['PROD-APP-AUTH'];
        const creatorUser = await getUserBySessionToken(sessionToken);

        let creator = ""

        if(creatorUser)
            creator = creatorUser._id.toString()

        const createdAt = new Date();
        const updatedAt = new Date();

        if (!title && !description && !completed && !color && !dueDate && !list)
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

        const sessionToken = req.cookies['PROD-APP-AUTH'];

        const creatorUser = await getUserBySessionToken(sessionToken);

        let creator = ""

        if(!creatorUser)
            return res.sendStatus(400);

        creator = creatorUser._id.toString()
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
      const { id } = req.params;
      const { title, content, favorite, color } = req.body;
  
      if (!title && !content && !favorite && !color) {
            return res.sendStatus(400);
      }
  
      const task = await getTaskById(id);

      if(task){
            task.title = title;
            task.description = content;
            task.completed = favorite;
            task.color = color;
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

export const updateCompleted =async (req: express.Request, res: express.Response) => {
    try {

        const { id } = req.params;
        const { completed,task} = req.body;// Buscar la tarea por su ID
      
        if (!task) {
            return res.sendStatus(404); // Si no se encuentra la tarea, lanzar un error
        }
      
        task.completed = completed; // Actualizar la propiedad "completed"
        
        await task.save(); // Guardar los cambios

        return res.status(200).json(task).end();
      
      } catch (error) {
            return res.sendStatus(400);
      }
}