'use client';

import { Button, Form, Input, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type WorkoutFormValues = {
    workout: string;
    currentType: string;
    reps: string;
    sets: string;
    weight: number;
    notes: string;
}

export default function AddWorkoutPage() {
    const [loading, setLoading] = useState(true);
    
    const router = useRouter();

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 200);
        return () => clearTimeout(timeout);
    }, []);

    const handleSubmit = async (values: WorkoutFormValues) => {
        try {
            const res = await fetch(`/api/workouts/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: values.workout,
                    type: values.currentType,
                    reps: values.reps,
                    sets: values.sets,
                    weight: values.weight,
                    notes: values.notes,
                }),
            });

            if (!res.ok) {
                const text = await res.text();
                console.error("Post failed:", res.status, text);
                throw new Error("Failed to create a Workout");
            }

            router.push('/workouts');

        } catch (error) {
            console.error("Error updating Workout:", error);
        }
    };

    if (loading) return (
        <div className="m-2">
            <Spin size="large" />
        </div>
    );


    return (
        <div className="m-2">
            <Form
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Enter a Workout"
                    name="workout"
                    rules={[{ required: true, message: 'Please enter a Workout' }]}
                >
                    <Input placeholder="" />
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
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </div>
                </Form.Item>

            </Form>
        </div>
    );
}