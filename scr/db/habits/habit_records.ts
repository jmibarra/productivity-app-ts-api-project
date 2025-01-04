import mongoose, { Schema, Document } from "mongoose";
import { HabitRecord } from "./interface/Ihabit_records";


const HabitRecordSchema: Schema = new Schema<HabitRecord& Document>(
  {
    habit_id: { type: Schema.Types.ObjectId, required: true, ref: "Habit" },
    date: { type: Date, required: true },
    progress: {
      completed: { type: Boolean, required: true },
      amount: { type: Number, default: null },
    },
    notes: { type: String },
  },
  { timestamps: true } // Para created_at y updated_at si deseas habilitarlo
);

export default mongoose.model<HabitRecord & Document>("HabitRecord", HabitRecordSchema);
