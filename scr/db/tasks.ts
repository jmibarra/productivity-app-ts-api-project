import mongoose from "mongoose";

const TasksSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String},
    completed: { type: Boolean, required: true},
    color: { type: String},
    createdAt: { type: Date, required: true},
    updatedAt: { type: Date, required: true},
    creator: { type: String, required: true},
    list: { type: Number, required: true},
    priority: {type: Number},
    dueDate: { type: Date},
    labels: { type: [String] }
    //Ver como hacer con las subtareas un array de objetos o un listado de ids que luego traigo.
})

export const TasksModel = mongoose.model('Task', TasksSchema);

export const getTasksByCreator = (creatorId: string, limit: number, page: number) => {
    const skipCount = (page - 1) * limit; // Calcular la cantidad de documentos que se deben omitir para la paginación

    return TasksModel.find({
        'creator': creatorId
    })
    .skip(skipCount) // Omitir los documentos según el cálculo anterior
    .limit(limit); // Limitar la cantidad de documentos devueltos por página
};

export const getTasksCountByCreator = (creatorId: string) => {
    return TasksModel.countDocuments({
        'creator': creatorId
    });
};

export const getTaskById = (id: string) => TasksModel.findById(id);
export const createTask = (values: Record<string, any>) => new TasksModel(values).save().then((note) => note.toObject());
export const deleteTaskById = (id: String) => TasksModel.findOneAndDelete({_id: id});
export const updateTaskById = ((id: String, values: Record<string, any>) => TasksModel.findByIdAndUpdate(id, values));