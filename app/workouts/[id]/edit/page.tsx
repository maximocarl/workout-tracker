'use client';

import React, { useEffect, useState } from "react";
import { Button, Form, Input } from 'antd';
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

type WorkoutFormValues = {
    currentType: string;
    reps: string;
    sets: string;
    weight: number;
    notes: string;
}

export default function EditPage() {
    const { id } = useParams<{ id: string }>();
    const [workout, setWorkout] = useState<Workout | null>(null);

    const router = useRouter();

    useEffect(() => {
        async function fetchCurrentWorkout() {
            try {
                const res = await fetch(`/api/workouts/${id}`);
                if (!res.ok) throw new Error("Failed to fetch the Workout");

                const data = await res.json();
                setWorkout(data.workout);
            } catch (error) {
                console.error(error);
            }
        }
        fetchCurrentWorkout();
    }, [id]);

    const handleSubmit = async (values: WorkoutFormValues) => {
        try {
            const res = await fetch(`/api/workouts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type: values.currentType,
                    reps: values.reps,
                    sets: values.sets,
                    weight: values.weight,
                    notes: values.notes,
                }),
            });

            if (!res.ok) {
                const text = await res.text();
                console.error("PUT failed:", res.status, text);
                throw new Error("Failed to update Workout");
            }

            router.push('/workouts');

        } catch (error) {
            console.error("Error updating Workout:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/workouts/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                const text = await res.text();
                console.error("DELETE failed:", res.status, text);
                throw new Error("Failed to delete Workout");
            }

            const json = await res.json();
            console.log("Workout deleted", json.day);
        } catch (error) {
            console.error("Error deleting Day:", error);
        }
    };


    return (
        <div className="m-2">
            <Form
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                    currentType: workout?.type,
                    reps: workout?.reps,
                    sets: workout?.sets,
                    weight: workout?.weight,
                    notes: workout?.notes,
                }}
            >
                <Form.Item label="Selected Workout">
                    <Input disabled placeholder={workout?.name ?? "Loading..."} />
                </Form.Item>
                <Form.Item
                    label="Type"
                    name="currentType"
                    rules={[{ required: true, message: 'Please enter the Type of Workout' }]}
                >
                    <Input placeholder="" />
                </Form.Item>
                <Form.Item
                    name="sets"
                    label="Enter the Number of Sets"
                    rules={[{ required: true, message: 'Please enter a number of Sets' }]}
                >
                    <Input placeholder="" />
                </Form.Item>
                <Form.Item
                    name="reps"
                    label="Enter the Number of Reps"
                    rules={[{ required: true, message: 'Please enter a number of Reps' }]}
                >
                    <Input placeholder="" />
                </Form.Item>
                <Form.Item
                    name="weight"
                    label="Enter the Weight"
                    rules={[{ required: true, message: 'Please enter the Weight' }]}
                >
                    <Input placeholder="" />
                </Form.Item>
                <Form.Item
                    name="notes"
                    label="Enter possible Notes"
                >
                    <Input placeholder="" />
                </Form.Item>

                <Form.Item style={{ textAlign: 'right' }}>
                    <div className="flex justify-end gap-2">
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDelete();
                                router.push(`/`)
                            }}
                            danger
                        >
                            Delete
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </div>
                </Form.Item>

            </Form>
        </div>
    );
}