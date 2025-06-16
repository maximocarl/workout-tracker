import { HomeFilled, HomeOutlined } from "@ant-design/icons";
import type { TabsProps } from "antd";

export function defaultTabs(pathname: string, children: React.ReactNode): TabsProps["items"] {
  const tabs: TabsProps["items"] = [
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

  const navDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const pathSegments = pathname.split("/").filter(Boolean);
  const day = pathSegments[0];

  if (navDays.includes(day)) {
    tabs.push({
      key: `/${day}`,
      label: <span>{day}</span>,
      children,
    });
  } else if (pathname === "/login") {
    tabs.push({
      key: "/login",
      label: <span>Login</span>,
      children,
    });
  }


  return tabs;
}
