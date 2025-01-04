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

export default mongoose.model<Habit & Document>("Habit", HabitSchema);
