import { HomeFilled, HomeOutlined } from "@ant-design/icons";
import type { TabsProps } from "antd";

export function defaultTabs(pathname: string, children: React.ReactNode): TabsProps["items"] {
  return [
    {
      key: "/",
      label: (
        <>
          {pathname === "/" ? <HomeFilled /> : <HomeOutlined />}
          <span>Home</span>
        </>
      ),
      children: pathname === "/" ? children : null,
    },
    {
      key: "/workouts",
      label: <span>Workouts</span>,
      children: pathname === "/workouts" ? children : null,
    },
  ];
}
