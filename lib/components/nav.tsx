"use client";

import { Tabs } from "antd";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { defaultTabs } from "@/lib/data/defaultTabs";
import UserAccess from "./userAccess";


export default function Nav({ children }: { children?: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    const items = defaultTabs(pathname, children) ?? [];

    const title = <h1 className="m-4 text-xl font-bold">Workout Tracker</h1>;
    const login = <UserAccess />;

    const extraContent = {
        left: title,
        right: login,
    };

    return (
        <Tabs
            onTabClick={(key) => router.push(key)}
            tabBarStyle={{ marginLeft: "1rem" }}
            tabBarExtraContent={extraContent}
            items={items.map(({ key, label }) => ({

                key,
                label: (
                    <span>{label}</span>
                ),
            }))}
        />
    );
}
