import { getServerSession } from "next-auth";

export default async function Page() {
    const session = await getServerSession();
    if (!session) {
        return (
            <div>
                <h1 className="text-2xl m-2">This is the Workouts page.</h1>
                <h2 className="text-xl m-2">This page only available once logged in.</h2>
            </div>
        );
    }
    return (
        <div>
        </div>
    );
}