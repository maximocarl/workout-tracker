import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Workout from '@/lib/models/Workout';

// GET Workout by ID
export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split("/").pop();

        await connectToDatabase();

        const workout = await Workout.findById(id);

        if (!workout) {
            return NextResponse.json({ error: 'Workout not found' }, { status: 404 });
        }

        return NextResponse.json({ workout }, { status: 200 });
    } catch (error) {
        console.error('Error fetching Workout', error);
        return NextResponse.json({ error: 'Failed to fetch Workout' }, { status: 500 });
    }
}

// PUT Workout by ID
export async function PUT(request: Request, context: any) {
    try {
        const { id } = context.params;

        await connectToDatabase();

        const updateData = await request.json();

        const updatedWorkout = await Workout.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedWorkout) {
            return NextResponse.json({ error: 'Day not found' }, { status: 404 });
        }

        return NextResponse.json({ workout: updatedWorkout }, { status: 200 });
    } catch (error) {
        console.error('Error updating Workout:', error);
        return NextResponse.json({ error: 'Failed to update Workout' }, { status: 500 });
    }
}

// DELETE Workout by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        await connectToDatabase();

        const deletedWorkout = await Workout.findByIdAndDelete(id);

        if (!deletedWorkout) {
            return NextResponse.json({ error: "Day not found" }, { status: 404 });
        }

        return NextResponse.json({ workout: deletedWorkout }, { status: 200 });
    } catch (error) {
        console.error('Error deleting Workout:', error);
        return NextResponse.json({ error: 'Failed to delete Workout' }, { status: 500 });
    }
}
