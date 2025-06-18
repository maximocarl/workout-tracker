import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Day from '@/lib/models/Day';

// Helper: check for valid MongoDB ObjectId
function isValidObjectId(id: string) {
    return /^[0-9a-fA-F]{24}$/.test(id);
}

// GET Day by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        if (!isValidObjectId(id)) {
            return NextResponse.json({ error: 'Invalid Day ID' }, { status: 400 });
        }

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