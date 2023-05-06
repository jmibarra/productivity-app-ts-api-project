import express from 'express';
import { createNote, deleteNoteById, getNotesByCreator } from '../db/notes';
import { get } from 'lodash';

export const createNewNote = async (req: express.Request, res: express.Response) => {
    try{
        const { title, content, favorite, color } = req.body;

        const creator = get(req, 'identity._id') as unknown as string;

        const createdAt = new Date();
        const updatedAt = new Date();

        if (!title && !content && !favorite && !color)
            return res.sendStatus(400);
      
        const note = await createNote({
            title,
            content,
            favorite,
            color,
            createdAt,
            updatedAt,
            creator
        });

        return res.status(200).json(note).end()

    }catch(error){
        console.log(error);
        return res.sendStatus(400)
    }
} 

export const getAllNotes = async (req: express.Request, res: express.Response) => {
    try {

        const creator = get(req, 'identity._id') as unknown as string;

        const notes = await getNotesByCreator(creator);

        const responseData = {
            notes: notes,
            count: notes.length
        }
        
        return res.status(200).json(responseData);

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const deleteNote = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deletedNote = await deleteNoteById(id);
  
        return res.json(deletedNote);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateNote = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const { title, content, favorite, color } = req.body;
  
      if (!title && !content && !favorite && !color) {
            return res.sendStatus(400);
      }
  
      const note = req.body.note
      
      if(note){
          note.title = title;
          note.content = content;
          note.favorite = favorite;
          note.color = color;
          note.updatedAt = new Date();
          await note.save();
      }else
          return res.sendStatus(404);
      
      return res.status(200).json(note).end();
  
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}