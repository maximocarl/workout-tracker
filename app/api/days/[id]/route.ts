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