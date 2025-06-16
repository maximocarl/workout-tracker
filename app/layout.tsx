"use client";
import "./globals.css";
import Nav from "../lib/components/nav";
import { usePathname, useRouter } from "next/navigation";

import { defaultTabs } from "@/lib/data/defaultTabs";



export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const pathSegments = pathname.split("/").filter(Boolean);
  const navDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const day = pathSegments[0];

  const activeKey = navDays.includes(day) ? `/${day}` : pathname;

  const startTabs = defaultTabs(pathname, children);

  return (
    <html lang="en">
      <body>
        <Nav
          activeKey={activeKey}
          items={startTabs}
          onTabClick={(key) => router.push(key)}
        />
      </body>
    </html>
  );
}
