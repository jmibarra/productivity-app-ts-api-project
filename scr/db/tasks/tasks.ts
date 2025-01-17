import mongoose, { SortOrder } from "mongoose";

const TasksSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String},
    completed: { type: Boolean, required: true},
    color: { type: String},
    createdAt: { type: Date},
    updatedAt: { type: Date},
    creator: { type: String, required: true},
    list: { type: String},
    priority: {type: Number},
    dueDate: { type: Date},
    labels: { type: [String] },
    
    //Ver como hacer con las subtareas un array de objetos o un listado de ids que luego traigo.
},
{ timestamps: true } // timestamps automáticamente gestiona createdAt y updatedAt
);

export const TasksModel = mongoose.model('Task', TasksSchema);

/**
 * Get the tasks of a given creator, with pagination and sorting.
 * @param {string} creatorId - The id of the creator of the tasks.
 * @param {number} limit - The number of tasks to return per page.
 * @param {number} page - The page number of the tasks to return.
 * @param {string} sortBy - The field to sort the tasks by.
 * @param {SortOrder} sortDirection - The direction of the sort.
 * @returns {Promise<Document[]>} - The tasks of the given creator, sorted by the given field and direction.
 */
export const getTasksByCreator = (creatorId: string, limit: number, page: number, sortBy: string, sortDirection: SortOrder) => {
    const skipCount = (page - 1) * limit; // Calcular la cantidad de documentos que se deben omitir para la paginación
    return TasksModel.find({
        'creator': creatorId
    }).sort({ [sortBy]: sortDirection }) // Ordenar los documentos según el campo y la dirección de ordenamiento
    .skip(skipCount) // Omitir los documentos según el cálculo anterior
    .limit(limit); // Limitar la cantidad de documentos devueltos por página
};

/**
 * Gets the count of tasks for a given creator.
 * @param {string} creatorId - The id of the creator of the tasks.
 * @returns {Promise<number>} - The count of tasks for the given creator.
 */
export const getTasksCountByCreator = (creatorId: string) => {
    return TasksModel.countDocuments({
        'creator': creatorId
    });
};

/**
 * Retrieves tasks for a given creator and list.
 * @param {string} creatorId - The id of the creator of the tasks.
 * @param {string} listId - The id of the list to which the tasks belong.
 * @returns {Promise<Document[]>} - The tasks of the given creator and list.
 */

export const getTasksByCreatorAndList = (creatorId: string, listId: string, limit: number, page: number, sortBy: string, sortDirection: SortOrder) => {
    const skipCount = (page - 1) * limit; // Calcular la cantidad de documentos que se deben omitir para la paginación
    return TasksModel.find({
        'creator': creatorId,
        'list': listId
    }).sort({ [sortBy]: sortDirection }) // Ordenar los documentos según el campo y la dirección de ordenamiento
    .skip(skipCount) // Omitir los documentos según el cálculo anterior
    .limit(limit); // Limitar la cantidad de documentos devueltos por página
}

/**
 * Gets the count of tasks for a given creator and list.
 * @param {string} creatorId - The id of the creator of the tasks.
 * @param {string} listId - The id of the list to which the tasks belong.
 * @returns {Promise<number>} - The count of tasks for the given creator and list.
 */
export const getTaskCountByCreatorAndList = (creatorId: string, listId: string) => {
    return TasksModel.countDocuments({
        'creator': creatorId,
        'list': listId
    });
}

export const getTaskById = (id: string) => TasksModel.findById(id);
export const createTask = (values: Record<string, any>) => new TasksModel(values).save().then((task) => task.toObject());
export const deleteTaskById = (id: String) => TasksModel.findOneAndDelete({_id: id});
export const updateTaskById = ((id: String, values: Record<string, any>) => TasksModel.findByIdAndUpdate(id, values));