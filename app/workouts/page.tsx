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

export default function WorkoutPage() {
  const router = useRouter();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  

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

  if (loading) return <p>Loading workouts...</p>;

  return (
    <div className='px-4'>
      <Row gutter={16}>
        {workouts.map((w, index) => (
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
