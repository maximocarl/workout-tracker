"use client";

import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button, Divider } from 'antd';
import { useRouter } from "next/navigation";

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

export default function DayPage({ params }: { params: { id: string } }) {
    const [day, setDay] = useState<Day | null>(null);

    const router = useRouter();

    useEffect(() => {
        async function fetchDay() {
            try {
                const res = await fetch(`/api/days/${params.id}`);
                if (!res.ok) throw new Error("Failed to fetch the Day");

                const data = await res.json();
                setDay(data.day);
            } catch (error) {
                console.error(error);
            }
        }
        fetchDay();
    }, [params.id]);

    return (
        <div className='px-4'>
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
                ))}
            </Row>
        </div>
    );
}