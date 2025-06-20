"use client";

import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button, Divider } from 'antd';
import { useRouter, useParams } from "next/navigation";

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

export default function DayPage() {
    const { id } = useParams<{ id: string }>();
    const [day, setDay] = useState<Day | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchDay() {
            try {
                const res = await fetch(`/api/days/${id}`);
                if (!res.ok) throw new Error("Failed to fetch the Day");

                const data = await res.json();
                setDay(data.day);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchDay();
    }, [id]);

    if (loading) return (
        <Row gutter={16}>
            <Col span={8}>
                <Card loading={loading}></Card>
            </Col>
            <Col span={8}>
                <Card loading={loading}></Card>
            </Col>
            <Col span={8}>
                <Card loading={loading}></Card>
            </Col>
        </Row>
    );
    
    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/days/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                const text = await res.text();
                console.error("DELETE failed:", res.status, text);
                throw new Error("Failed to delete Day");
            }

            const json = await res.json();
            console.log("Day deleted", json.day);
        } catch (error) {
            console.error("Error deleting Day:", error);
        }
    };


    if (!day) return <div>Loading...</div>;


    return (
        <div className='px-4'>
            <h1 className="text-3xl m-2">
                <strong>{day.day}</strong> - {day.routine}
            </h1>
            <Row gutter={16}>
                {day?.workouts.map((w, index) => (
                    <Col key={index} span={8}>
                        <Card
                            title={w.name}
                            variant="borderless"
                            styles={{ body: { margin: '16px' } }}
                            hoverable={true}
                        >
                            <p>{w.sets} sets for {w.sets} Reps</p>
                            <p>At a weight of {w.weight} lbs</p>
                            <p>Notes: {w.notes}</p>
                            <Divider />
                            <div className='text-right'>
                                <Button
                                    type="primary"
                                    ghost
                                    className='mr-2'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        router.push(`/workouts/${w._id}/edit`)
                                    }}
                                >
                                    Edit
                                </Button>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
            <div className="text-right">
                <Divider />
                <Button
                    type="primary"
                    className='mr-2'
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/${day._id}/edit`)
                    }}
                >
                    Edit
                </Button>
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
            </div>

        </div>
    );
}