"use client";
import React from 'react';
import { Card, Col, Row, Button, Divider } from 'antd';
import { useRouter } from 'next/navigation';

import Days from '@/lib/data/days';

export default function Home() {
  const router = useRouter();

  return (
    <div className='px-4'>
      <Row gutter={16}>
        {Days.map((day, index) =>
          <Col key={index} span={8}>
            <Card
              title={day.day}
              variant="borderless"
              styles={{ body: { margin: '16px' } }}
              hoverable={true}
              onClick={() => router.push(`/${day.day}`)}
            >
              <p className="font-bold text-xl text-center">
                {day.label}
              </p>
              <Divider />
              <div className='text-right'>
                <Button
                  type="primary"
                  ghost
                  className='mr-2'
                  onClick={(e) => {
                    // stopPropagation stops event bubbling
                    // when clicking on the edit button it would
                    // click on the card instead
                    e.stopPropagation();
                    router.push(`/${day.day}/edit`)
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
