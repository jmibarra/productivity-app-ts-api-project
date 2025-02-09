import { ObjectId } from "mongoose";

export interface Habit {
  _id?: ObjectId;
  creator: string; // ID del usuario
  name: string; // Nombre del hábito
  description?: string; // Descripción opcional
  icon?: string; // Identificador del icono
  goal: {
    type: "daily" | "quantity"; // Tipo de objetivo
    target: number; // Objetivo (e.g., 1 para cumplido o cantidad específica)
  };
  frequency: {
    type: "daily" | "weekly" | "interval"; // Tipo de frecuencia
    details: {
      days_of_week?: string[]; // Días específicos para 'daily'
      weekly_target?: number; // Número de días por semana para 'weekly'
      interval_days?: number; // Días entre repeticiones para 'interval'
    };
  };
  created_at?: Date;
  updated_at?: Date;
}
