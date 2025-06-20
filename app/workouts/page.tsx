"use client";
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button, Divider, ConfigProvider } from 'antd';
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

export default function WorkoutPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  
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
        setLoading(false);
      }
    }
    fetchWorkouts();
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
      <div className="text-right mb-3">
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
            onClick={() => router.push(`/workouts/add`)}
          >
            ADD
          </Button>
        </ConfigProvider>

      </div>
      <Row gutter={16}>
        {workouts.map((w, index) => (
          <Col key={index} span={8}>
            <Card
              title={w.name}
              variant="borderless"
              styles={{ body: { margin: '16px' } }}
              hoverable={true}
            >
              <p>{w.sets} Sets for {w.sets} Reps</p>
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
    </div>
  );
}
