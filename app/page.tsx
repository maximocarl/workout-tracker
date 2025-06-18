import { DayCard } from "@/lib/components/dayCard";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    return (
      <div>
        <h1 className="text-2xl m-2">This is the Home page.</h1>
        <h2 className="text-xl m-2">Please sign in to view this page.</h2>
      </div>


    );
  }

  return (
    <DayCard />
  );
}

// 