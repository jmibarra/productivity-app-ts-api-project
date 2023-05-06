import mongoose from "mongoose";

const TasksSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    completed: { type: Boolean, required: true},
    color: { type: String, required: true},
    createdAt: { type: Date, required: true},
    updatedAt: { type: Date, required: true},
    creator: { type: String, required: true},
    list: { type: String, required: true},
    priority: {type: Number},
    dueDate: { type: Date, required: true},
    labels: { type: [String] }
    //Ver como hacer con las subtareas un array de objetos o un listado de ids que luego traigo.
})

export const TasksModel = mongoose.model('Task', TasksSchema);

export const getTasksByCreator = (creatorId: String) => TasksModel.find({
    'creator': creatorId
});
export const getTaskById = (id: string) => TasksModel.findById(id);
export const createTask = (values: Record<string, any>) => new TasksModel(values).save().then((note) => note.toObject());
export const deleteTaskById = (id: String) => TasksModel.findOneAndDelete({_id: id});
export const updateTaskById = ((id: String, values: Record<string, any>) => TasksModel.findByIdAndUpdate(id, values));