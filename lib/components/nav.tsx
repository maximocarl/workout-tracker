"use client";

import { Tabs, Button, ConfigProvider } from "antd";
import type { TabsProps } from "antd";
import { HomeOutlined, HomeFilled } from '@ant-design/icons';
import Link from "next/link";


// Extra Content 
const login =
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
        <Button type="primary" style={{ margin: '1rem' }}>
            Login
        </Button>
    </ConfigProvider>;

const title = <h1 className="m-4 text-xl font-bold">Workout Tracker</h1>;

const extraContent = {
    left: title,
    right: login,
};

interface NavProps {
    items: TabsProps['items'];
    activeKey: string;
    onTabClick: (key: string) => void;
}


export default function Nav({ items = [], activeKey, onTabClick }: NavProps) {
    return (
        <Tabs
            activeKey={activeKey}
            onTabClick={onTabClick}
            tabBarStyle={{ marginLeft: "1rem" }}
            tabBarExtraContent={extraContent}
            items={items.map(({ key, label, children }) => ({
                key,
                label: (
                    <span>{label}</span>
                ),
                children,
            }))}
        />
    );
}
