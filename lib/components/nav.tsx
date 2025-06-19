"use client";

import { Tabs } from "antd";
import { useRouter, usePathname } from 'next/navigation';
import { defaultTabs } from "@/lib/data/defaultTabs";
import UserAccess from "./userAccess";


export default function Nav({ children }: { children?: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    const pathSegments = pathname.split("/").filter(Boolean);
    const navDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const day = pathSegments[0];

    const activeKey = navDays.includes(day) ? `/${day}` : pathname;

    const items = defaultTabs(pathname, children) ?? [];

    const title = <h1 className="m-4 text-xl font-bold">Workout Tracker</h1>;
    const login = <UserAccess />;

    const extraContent = {
        left: title,
        right: login,
    };

    return (
        <Tabs
            activeKey={activeKey}
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
