import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
    title: { type: String, required: true},
    content: { type: String, required: true},
    favorite: { type: Boolean, required: true},
    color: { type: String, required: true},
    createdAt: { type: Date, required: true},
    creator: { type: String, required: true}
})

export const NotesModel = mongoose.model('Note', NotesSchema);

export const getNotes = () => NotesModel.find();
//Tengo que armar uno para traer solo las notas de mi usuario.

export const getNoteById = (id: string) => NotesModel.findById(id);
export const createNote = (values: Record<string, any>) => new NotesModel(values).save().then((note) => note.toObject());
export const deleteNoteById = (id: String) => NotesModel.findOneAndDelete({_id: id});
export const updateNoteById = ((id: String, values: Record<string, any>) => NotesModel.findByIdAndUpdate(id, values));