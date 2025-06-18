'use client';
import { Button, Form, Input } from 'antd';

export default function EditPage() {
    return (
        <div className="m-2">
            <Form
                layout="vertical"
                style={{ maxWidth: 600 }}
            >
                <Form.Item label="Selected Day">
                    <Input disabled placeholder="Current Day" />
                </Form.Item>
                <Form.Item
                    label="Current Routine"
                    name="currentRoutine"
                    rules={[{ required: true, message: 'Please enter a Routine for the Day' }]}
                >
                    <Input placeholder="Current Routine" />
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}