import mongoose, { Schema, Document} from "mongoose";

import "./Workout";

export interface IDay extends Document {
    day: string;
    routine: string;
    workouts: mongoose.Types.ObjectId[]; 
}

const DaySchema: Schema = new Schema(
    {
        day: {
            type: String,
            required: true,
            enum: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
            ],
        },
        routine: {
            type: String,
            required: true,
        },
        workouts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Workout",
                required: true,
            }
        ]
    }
)

export default mongoose.models.Day || mongoose.model<IDay>("Day", DaySchema)