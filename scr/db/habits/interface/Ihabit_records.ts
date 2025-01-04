import { ObjectId } from "mongoose";

export interface HabitRecord {
  _id?: ObjectId;
  habit_id: ObjectId; // Referencia al hábito
  date: Date; // Fecha del registro
  progress: {
    completed: boolean; // Si el hábito fue cumplido
    amount?: number; // Cantidad alcanzada (si aplica)
  };
  notes?: string; // Notas adicionales
}
