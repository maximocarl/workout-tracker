import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Day from '@/lib/models/Day';

// GET Day by ID
export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split("/").pop();

        await connectToDatabase();

        const day = await Day.findById(id).populate("workouts");

        if (!day) {
            return NextResponse.json({ error: 'Day not found' }, { status: 404 });
        }

        return NextResponse.json({ day }, { status: 200 });
    } catch (error) {
        console.error('Error fetching Day', error);
        return NextResponse.json({ error: 'Failed to fetch Day' }, { status: 500 });
    }
}

// PUT Day by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        await connectToDatabase();

        const updateData = await request.json();

        const updatedDay = await Day.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        }).populate("workouts");

        if (!updatedDay) {
            return NextResponse.json({ error: 'Day not found' }, { status: 404 });
        }

        return NextResponse.json({ day: updatedDay }, { status: 200 });
    } catch (error) {
        console.error('Error updating Day:', error);
        return NextResponse.json({ error: 'Failed to update Day' }, { status: 500 });
    }
}

// DELETE Day by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        await connectToDatabase();

        const deletedDay = await Day.findByIdAndDelete(id);

        if (!deletedDay) {
            return NextResponse.json({ error: "Day not found" }, { status: 404 });
        }

        return NextResponse.json({ day: deletedDay }, { status: 200 });
    } catch (error) {
        console.error('Error deleting Day:', error);
        return NextResponse.json({ error: 'Failed to delete Day' }, { status: 500 });
    }
}
