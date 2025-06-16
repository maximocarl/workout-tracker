"use client";
import "./globals.css";
import Nav from "../lib/components/nav";
import { usePathname, useRouter } from "next/navigation";

import { defaultTabs } from "@/lib/data/defaultTabs";



export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const onTabClick = (key: string) => {
    router.push(key);
  };

  const startTabs = defaultTabs(pathname, children);

  return (
    <html lang="en">
      <body>
        <Nav
          activeKey={pathname}
          items={startTabs}
          onTabClick={onTabClick}
        />
      </body>
    </html>
  );
}
