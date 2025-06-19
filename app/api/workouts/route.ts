import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Workout from "@/lib/models/Workout";

// GET all Workouts
export async function GET() {
    try {
        await connectToDatabase();

        const workouts = await Workout.find({});

        return NextResponse.json({ workouts }, { status: 200 });
    } catch (error) {
        console.error('Error fetching workouts:', error);

        return NextResponse.json(
            { error: 'Failed to fetch workouts' },
            { status: 500 }
        );
    }
}

// POST a new Workout
export async function POST(request: Request) {
    try {
        await connectToDatabase();

        const data = await request.json();
        const newWorkout = await Workout.create(data);

        return NextResponse.json({ workout: newWorkout }, { status: 201 })
    } catch (error) {
        console.error("Error creating new Workout", error);

        return NextResponse.json(
            { error: " Failed to create a new Workout" },
            { status: 500 }
        );
    }
}