import mongoose, { Schema, Document } from "mongoose";
import { Habit } from "./interface/Ihabit";

const HabitSchema: Schema = new Schema<Habit & Document>(
  {
    user_id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    icon: { type: String, required: true },
    goal: {
      type: {
        type: String,
        enum: ["daily", "quantity"],
        required: true,
      },
      target: { type: Number, required: true },
    },
    frequency: {
      type: {
        type: String,
        enum: ["daily", "weekly", "interval"],
        required: true,
      },
      details: {
        days_of_week: { type: [String], default: undefined },
        weekly_target: { type: Number, default: undefined },
        interval_days: { type: Number, default: undefined },
      },
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { timestamps: true } // timestamps automáticamente gestiona created_at y updated_at
);

export const HabitModel = mongoose.model<Habit & Document>("Habit", HabitSchema);

export const getHabitsByCreator = (creatorId: string, limit: number, page: number) => {
    const skipCount = (page - 1) * limit;
    return HabitModel.find({
        "user_id": creatorId
    })
        .skip(skipCount)
        .limit(limit);
};

export const getHabitsCountByCreator = (creatorId: string) => {
    return HabitModel.countDocuments({
        "creator": creatorId
    });
};

export const getHabitById = (id: string) => HabitModel.findById(id);
export const createHabit = (values: Record<string, any>) => new HabitModel(values).save().then((habit) => habit.toObject());
export const deleteHabitById = (id: String) => HabitModel.findOneAndDelete({ _id: id });
export const updateHabitById = (id: String, values: Record<string, any>) => HabitModel.findByIdAndUpdate(id, values);