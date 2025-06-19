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


export default function AddDayPage() {
    const [allWorkouts, setAllWorkouts] = useState<Workout[]>([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchCurrentDay() {
            try {
                const res = await fetch(`/api/workouts`)
                if (!res.ok) throw new Error("Failed to fetch the Day");

                const data = await res.json();

                setAllWorkouts(data.workouts);
            } catch (error) {
                console.error(error);
            }
        }
        fetchCurrentDay();
    }, []);

    const handleSubmit = async (values: DayFormValues) => {
        try {
            const res = await fetch(`/api/days/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    day: values.currentDay,
                    routine: values.currentRoutine,
                    workouts: values.workouts
                }),

            });

            if (!res.ok) {
                const text = await res.text();
                console.error("Post failed:", res.status, text);
                throw new Error("Failed to create a Day");
            }

            router.push('/');

        } catch (error) {
            console.error("Error updating Workout:", error);
        }
    };

    const workoutOptions = allWorkouts.map(workout => ({
        label: workout.name,
        value: workout._id,
    })) ?? [];



    return (
        <div className="m-2">
            <Form
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Enter a Day"
                    name="currentDay"
                    rules={[{ required: true, message: 'Please enter a Day' }]}
                >
                    <Input placeholder="" />
                </Form.Item>
                <Form.Item
                    label="Enter a Routine"
                    name="currentRoutine"
                    rules={[{ required: true, message: 'Please enter a Routine for the Day' }]}
                >
                    <Input placeholder="" />
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