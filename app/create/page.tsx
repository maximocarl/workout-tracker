'use client';

import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from 'antd';
import { useRouter } from 'next/navigation';

type Workout = {
    _id: string;
    name: string;
    type: string;
    reps: number;
    sets: number;
    weight: number;
    notes?: string;
};

type DayFormValues = {
    currentDay: string;
    currentRoutine: string;
    workouts: string[]; 
};

export default function CreatePage() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    // const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        async function fetchWorkouts() {
            try {
                const res = await fetch("/api/workouts");
                const data = await res.json();
                setWorkouts(data.workouts);
            } catch (error) {
                console.error("Failed to fetch workouts", error);
            } finally {
                // setLoading(false);
            }
        }
        fetchWorkouts();
    }, []);

    const workoutOptions = workouts.map(workout => ({
        label: workout.name,
        value: workout._id,
    })) ?? [];

    const handleSubmit = async (values: DayFormValues) => {
        try {
            const res = await fetch(`/api/days`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    day: values.currentDay,
                    routine: values.currentRoutine,
                    workouts: values.workouts,
                }),
            });

            if (!res.ok) {
                const text = await res.text();
                console.error("POST failed:", res.status, text);
                throw new Error("Failed to create Day");
            }

            const json = await res.json();
            console.log("Day created", json.day);
            router.push(`/${json.day._id}`);
        } catch (error) {
            console.error("Error creating Day:", error);
        }
    };

    return (
        <div className="m-2">
            <Form
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                    workouts: [],
                }}
            >
                <Form.Item
                    label="Selected Day"
                    name="currentDay"
                    rules={[{ required: true, message: 'Please enter a Day' }]}
                >
                    <Input placeholder="Enter a Day" />
                </Form.Item>
                <Form.Item
                    label="Current Routine"
                    name="currentRoutine"
                    rules={[{ required: true, message: 'Please enter a Routine for the Day' }]}
                >
                    <Input placeholder="Enter a Routine for the Day" />
                </Form.Item>
                <Form.Item
                    name="workouts"
                    label="Select Workouts"
                    rules={[{ required: true, message: 'Please choose at least one Workout' }]}
                >
                    <Select
                        mode="multiple"
                        allowClear
                        placeholder="Select Workouts"
                        options={workoutOptions}
                    />
                </Form.Item>
                <Form.Item style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}