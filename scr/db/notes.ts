import mongoose from "mongoose";

interface Note extends Document {
    title: string;
    content: string;
    favorite: boolean;
    color: string;
    createdAt: Date;
    updatedAt?: Date;
    creator: string;
}

const NotesSchema = new mongoose.Schema({
    title: { type: String, required: true},
    content: { type: String, required: true},
    favorite: { type: Boolean, required: true},
    color: { type: String, required: true},
    createdAt: { type: Date, required: true},
    updatedAt: { type: Date },
    creator: { type: String, required: true}
})

export const NotesModel = mongoose.model<Note>('Note', NotesSchema);

export const getNotesByCreator = (creatorId: String) => NotesModel.find({
    'creator': creatorId
});
export const getNoteById = (id: string) => NotesModel.findById(id);
export const createNote = (values: Record<string, any>) => new NotesModel(values).save().then((note) => note.toObject());
export const deleteNoteById = (id: String) => NotesModel.findOneAndDelete({_id: id});
export const updateNoteById = ((id: String, values: Record<string, any>) => NotesModel.findByIdAndUpdate(id, values));