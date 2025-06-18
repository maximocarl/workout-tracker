"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button, Divider } from 'antd';

type Workout = {
  _id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
};

type Day = {
    _id: string;
    day: string;
    routine: string;
    workouts: Workout[];
};

export function DayCard() {
    const router = useRouter();

    const [days, setDays] = useState<Day[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDays() {
            try {
                const res = await fetch("/api/days");

                if (!res.ok) throw new Error("Failed to fetch days");

                const data = await res.json();

                setDays(data.days || data);
            } catch (error) {
                console.error("Error fetching days:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchDays();
    }, []);

    if (loading) return <p>Loading days...</p>;

    return (
        <div className='px-4'>
            <Row gutter={16}>
                {days.map((day, index) =>
                    <Col key={index} span={8}>
                        <Card
                            title={day.day}
                            variant="borderless"
                            styles={{ body: { margin: '16px' } }}
                            hoverable={true}
                            onClick={() => router.push(`/${day._id}`)}
                        >
                            <p className="font-bold text-xl text-center">
                                {day.routine}
                            </p>
                            <Divider />
                            <div className='text-right'>
                                <Button
                                    type="primary"
                                    ghost
                                    className='mr-2'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        router.push(`/${day._id}/edit`)
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    onClick={(e) =>
                                        e.stopPropagation
                                    }
                                    danger
                                >
                                    Delete
                                </Button>
                            </div>
                        </Card>
                    </Col>
                )}
            </Row>
        </div>
    );
}