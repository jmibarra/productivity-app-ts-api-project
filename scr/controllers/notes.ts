import express from 'express';
import { deleteNoteById, getNoteById, getNotes } from '../db/notes';

export const getAllNotes = async (req: express.Request, res: express.Response) => {
    try {
        const notes = await getNotes();
        return res.status(200).json(notes);
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
  
      const note = await getNoteById(id);
      
      if(note){
          note.title = title;
          note.content = content;
          note.favorite = favorite;
          note.color = color;
          await note.save();
      }else
          return res.sendStatus(404);
      
      return res.status(200).json(note).end();
  
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
}