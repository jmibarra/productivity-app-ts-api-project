import express from 'express';
import { createNote, deleteNoteById, getNotesByCreator, getNotesCountByCreator } from '../db/notes';
import { get } from 'lodash';

export const createNewNote = async (req: express.Request, res: express.Response) => {
    try{
        const { title, content, favorite, color, labels } = req.body;

        const creator = get(req, 'identity._id') as unknown as string;

        if (!title && !content && !favorite && !color)
            return res.sendStatus(400);
      
        const note = await createNote({
            title,
            content,
            favorite,
            color,
            creator,
            labels
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

        const limit = parseInt(req.query.limit as string) ?? 10;
        const page = parseInt(req.query.page as string) ?? 1;

        const totalCount = await getNotesCountByCreator(creator); // Obtener el recuento total de documentos
        const notes = await getNotesByCreator(creator, limit, page);

        const responseData = {
            notes: notes,
            count: totalCount
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

        const { title, content, favorite, color, labels } = req.body;
      
        const note = req.body.note
      
        if(note){
            note.title = title ? title : note.title;
            note.content = content ? content : note.content;
            note.favorite = favorite !== undefined ? favorite: note.favorite;
            note.color = color ? color : note.color;
            note.labels = labels ? labels : note.labels;
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