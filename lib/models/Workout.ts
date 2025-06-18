import mongoose, { Schema, Document } from "mongoose";

export interface IWorkout extends Document {
    name: string;
    type: string;
    reps: number;
    sets: number;
    weight: string;
    notes?: string;
}

const WorkoutSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        reps: {
            type: Number,
            required: true,
        },
        sets: {
            type: Number,
            required: true,
        },
        weight: {
            type: Number,
            required: true,
        },
        notes: {
            type: String,
        }
    }
)

export default mongoose.models.Workout || mongoose.model<IWorkout>("Workout", WorkoutSchema);