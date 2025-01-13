import mongoose from "mongoose";

const ListSchema = new mongoose.Schema({
    name: { type: String, required: true},
    icon: { type: String},
    color: { type: String},
    creator: { type: String, required: true},
    order: { type: Number},
},
{ timestamps: true } // timestamps automáticamente gestiona createdAt y updatedAt
);

export const ListModel = mongoose.model('List', ListSchema);

export const getLists = (creatorId: string) => ListModel.find({
    'creator': creatorId
}).sort({order: 1});

export const getListById = (listId: string) => ListModel.findById(listId);
export const createList = (values: Record<string, any>) => new ListModel(values).save().then((list) => list.toObject());
export const deleteListById = (listId: string) => ListModel.findByIdAndDelete(listId);
export const updateListById = (listId: string, values: Record<string, any>) => ListModel.findByIdAndUpdate(listId, values);

//Obtengo la lista del creador enviado con el valor mas grande en el campo "order" y devuelvo el valor de ese campo
export const getNextListOrder = (creatorId: string) => ListModel.findOne({
    'creator': creatorId
}).sort({order: -1}).then((list) => {
    if (list && list.order !== undefined) {
        return list.order + 1;
    } else {
        return 1;
    }
});
   
