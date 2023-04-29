import express from 'express';
import { createNote, deleteNoteById, getNoteById, getNotesByCreator } from '../db/notes';
import { getUserBySessionToken } from '../db/users';

export const createNewNote = async (req: express.Request, res: express.Response) => {
    try{
        const { title, content, favorite, color } = req.body;

        const sessionToken = req.cookies['PROD-APP-AUTH'];
        const creatorUser = await getUserBySessionToken(sessionToken);

        let creator = ""

        if(creatorUser)
            creator = creatorUser._id.toString()

        const createdAt = new Date();

        if (!title && !content && !favorite && !color)
            return res.sendStatus(400);
      
        const note = await createNote({
            title,
            content,
            favorite,
            color,
            createdAt,
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

        const sessionToken = req.cookies['PROD-APP-AUTH'];

        const creatorUser = await getUserBySessionToken(sessionToken);

        let creator = ""

        if(!creatorUser)
            return res.sendStatus(400);

        creator = creatorUser._id.toString()
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