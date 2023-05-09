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

export const getNotesByCreator = (creatorId: string, limit: number, page: number) => {
    const skipCount = (page - 1) * limit; // Calcular la cantidad de documentos que se deben omitir para la paginación

    return NotesModel.find({
        'creator': creatorId
    })
    .skip(skipCount) // Omitir los documentos según el cálculo anterior
    .limit(limit); // Limitar la cantidad de documentos devueltos por página
};
export const getNotesCountByCreator = (creatorId: string) => {
    return NotesModel.countDocuments({
        'creator': creatorId
    });
};
export const getNoteById = (id: string) => NotesModel.findById(id);
export const createNote = (values: Record<string, any>) => new NotesModel(values).save().then((note) => note.toObject());
export const deleteNoteById = (id: String) => NotesModel.findOneAndDelete({_id: id});
export const updateNoteById = ((id: String, values: Record<string, any>) => NotesModel.findByIdAndUpdate(id, values));