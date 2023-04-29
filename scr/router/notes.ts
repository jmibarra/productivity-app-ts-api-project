import express, { Router } from "express";
import { isAuthenticated } from "../middlewares";
import { createNewNote, deleteNote, getAllNotes, updateNote } from "../controllers/notes";

export default (router: express.Router) => {
    router.post('/notes', isAuthenticated, createNewNote);
    router.get('/notes', isAuthenticated, getAllNotes);
    router.delete('/notes/:id', isAuthenticated, deleteNote);
    router.patch('/notes/:id', isAuthenticated, updateNote);
    //Me faltaria un middleware generico para que todos los objetos tengan un owner id y no los puedas editar / borrar si no los tienen.
}