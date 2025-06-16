"use client";

import { Tabs, Button, ConfigProvider } from "antd";
import type { TabsProps } from "antd";
import { useRouter, usePathname } from 'next/navigation';
// import { useSession, signIn, signOut } from "next-auth/react";
import { defaultTabs } from "@/lib/data/defaultTabs";

interface NavProps {
    // items: TabsProps['items'];
    // activeKey: string;
    // onTabClick: (key: string) => void;
    children?: React.ReactNode;
}


export default function Nav({ children }: NavProps) {
    const router = useRouter();
    const pathname = usePathname();
    // const { data: session } = useSession();

    const pathSegments = pathname.split("/").filter(Boolean);
    const navDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const day = pathSegments[0];

    const activeKey = navDays.includes(day) ? `/${day}` : pathname;

    const items = defaultTabs(pathname, children) ?? [];

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
            {/* {session ? (
                <Button type="primary" onClick={() => signOut()} style={{ margin: "1rem" }}>
                    Sign Out {session.user?.name}
                </Button>
            ) : (
                <Button type="primary" onClick={() => signIn()} style={{ margin: "1rem" }}>
                    Sign In
                </Button>
            )} */}
        </ConfigProvider>;

    const title = <h1 className="m-4 text-xl font-bold">Workout Tracker</h1>;

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
