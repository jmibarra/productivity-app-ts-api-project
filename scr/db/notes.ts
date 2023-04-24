import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
    title: { type: String, required: true},
    content: { type: String, required: true},
    favorite: { type: Boolean, required: true},
    color: { type: String, required: true},
    createdAt: { type: Date, required: true}
})

export const NotesModel = mongoose.model('Note', NotesSchema);