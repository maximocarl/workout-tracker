"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button, Divider, ConfigProvider } from 'antd';

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
                        </Card>
                    </Col>
                )}
            </Row>
            <div className="text-right">
                <Divider />
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                colorPrimary: '#52c41a',
                                colorPrimaryHover: '#389e0d',
                                colorPrimaryActive: '#237804',
                            },
                        },
                    }}
                >
                    <Button
                        type="primary"
                        onClick={() => router.push(`/add`)}
                    >
                        ADD
                    </Button>
                </ConfigProvider>
            </div>
        </div>
    );
}