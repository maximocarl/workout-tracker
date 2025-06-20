'use client';

import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from 'antd';
import { useParams, useRouter } from 'next/navigation';

type Workout = {
    _id: string;
    name: string;
    type: string;
    reps: number;
    sets: number;
    weight: number;
    notes?: string;
};

type Day = {
    _id: string;
    day: string;
    routine: string;
    workouts: Workout[];
}

type DayFormValues = {
    currentDay: string;
    currentRoutine: string;
    workouts: string[]; 
};


export default function EditPage() {
    const [day, setDay] = useState<Day | null>(null);
    const [allWorkouts, setAllWorkouts] = useState<Workout[]>([]);

    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    useEffect(() => {
        async function fetchCurrentDay() {
            try {
                const res = await fetch(`/api/days/${id}`);
                const res2 = await fetch(`/api/workouts`)
                if (!res.ok || !res2.ok) throw new Error("Failed to fetch the Day");

                const data = await res.json();
                const data2 = await res2.json();

                setDay(data.day);
                setAllWorkouts(data2.workouts);
            } catch (error) {
                console.error(error);
            }
        }
        fetchCurrentDay();
    }, [id]);

    const workoutOptions = allWorkouts.map(workout => ({
        label: workout.name,
        value: workout._id,
    })) ?? [];

    const handleSubmit = async (values: DayFormValues) => {
        try {
            const res = await fetch(`/api/days/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    routine: values.currentRoutine,
                    workouts: values.workouts,
                }),
            });

            if (!res.ok) {
                const text = await res.text();
                console.error("PUT failed:", res.status, text);
                throw new Error("Failed to update Day");
            }

            const json = await res.json();
            console.log("Day updated", json.day);
            router.push(`/${day?._id}`);
        } catch (error) {
            console.error("Error updating Day:", error);
        }
    };

    return (
        <div className="m-2">
            <Form
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                    currentRoutine: day?.routine ?? '',
                    workouts: day?.workouts?.map(w => w._id) ?? [],
                }}
            >
                <Form.Item label="Selected Day">
                    <Input disabled placeholder={day?.day ?? 'Loading...'} />
                </Form.Item>
                <Form.Item
                    label="Current Routine"
                    name="currentRoutine"
                    rules={[{ required: true, message: 'Please enter a Routine for the Day' }]}
                >
                    <Input placeholder={day?.routine ?? 'Loading...'} />
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