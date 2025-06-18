import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Day from '@/lib/models/Day';

// GET all Days
export async function GET() {
    try {
        await connectToDatabase();

        const days = await Day.find({}).populate("workouts");

        return NextResponse.json({ days }, { status: 200 });
    } catch (error) {
        console.error("Error fetching Days:", error);

        return NextResponse.json(
            { error: "Failed to fetch Days" },
            { status: 500 }
        );
    }
}

// POST a new Day
export async function POST(request: Request) {
    try {
        await connectToDatabase();

        const data = await request.json();
        const newDay = await Day.create(data);

        return NextResponse.json({ Day: newDay }, { status: 201 });
    } catch (error) {
        console.error("Error creating new Day", error);

        return NextResponse.json(
            { error: " Failed to create a new Day"},
            { status: 500 }
        );
    }
}