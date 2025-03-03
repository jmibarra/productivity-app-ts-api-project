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

export const HabitRecordModel = mongoose.model<HabitRecord & Document>("HabitRecord", HabitRecordSchema);

/**
 * Get habit records of a given habit, with pagination.
 * @param {string} habitId - The id of the habit to which the records belong.
 * @param {number} limit - The number of records to return per page.
 * @param {number} page - The page number of the records to return.
 * @returns {Promise<Document[]>} - The records of the given habit, sorted by date in descending order.
 */
export const getHabitRecordByHabitId = (habitId: string, limit: number, page: number) => {
  const skipCount = (page - 1) * limit;
  return HabitRecordModel.find({
    "habit_id": habitId
  })
    .skip(skipCount)
    .limit(limit);
};

/**
 * Gets the count of habit records for a given habit.
 * @param {string} habitId - The id of the habit to which the records belong.
 * @returns {Promise<number>} - The count of records for the given habit.
 */
export const getHabitRecordCountByHabitId = (habitId: string) => {
  return HabitRecordModel.countDocuments({
    "habit_id": habitId
  });
}

/**
 * Gets a habit record by its id.
 * @param {string} id - The id of the habit record to get.
 * @returns {Promise<Document>} - The habit record with the given id.
 */
export const getHabitRecordById = (id: string) => HabitRecordModel.findById(id);

/**
 * Creates a habit record.
 * @param {Record<string, any>} values - The values of the habit record to create.
 * @returns {Promise<Document>} - The created habit record.
 */

export const createHabitRecord = (values: Record<string, any>) => new HabitRecordModel(values).save().then((habitRecord) => habitRecord.toObject());

/**
 * Deletes a habit record by its id.
 * @param {string} id - The id of the habit record to delete.
 * @returns {Promise<Document>} - The deleted habit record.
 */

export const deleteHabitRecordById = (id: string) => HabitRecordModel.findOneAndDelete({ _id: id });

/**
 * Updates a habit record by its id.
 * @param {string} id - The id of the habit record to update.
 * @param {Record<string, any>} values - The updated values of the habit record.
 * @returns {Promise<Document>} - The updated habit record.
 */

export const updateHabitRecordById = (id: string, values: Record<string, any>) => HabitRecordModel.findByIdAndUpdate(id, values);

/**
 * Gets a habit record by its habit id and date.
 * @param {string} habitId - The id of the habit to which the record belongs.
 * @param {Date} date - The date of the record.
 * @returns {Promise<Document>} - The habit record with the given habit id and date.
 */
export const getHabitRecordByHabitIdAndDate = (habitId: string, date: Date) => {
  return HabitRecordModel.findOne({
    "habit_id": habitId,
    "date": date
  });
};

/**
 * Gets habit records by its habit id and date range.
 * @param {string} habitId - The id of the habit to which the records belong.
 * @param {Date} startDate - The start date of the range.
 * @param {Date} endDate - The end date of the range.
 * @returns {Promise<Document[]>} - The habit records with the given habit id and date range.
 */
export const getHabitRecordByHabitIdAndDateRange = (habitId: string, startDate: Date, endDate: Date) => {
  return HabitRecordModel.find({
    "habit_id": habitId,
    "date": { $gte: startDate, $lte: endDate }
  });
};



