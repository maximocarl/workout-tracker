import { getServerSession } from "next-auth";

export default async function Page() {
    const session = await getServerSession();
    if (!session) {
        return (
            <div>
                <h1 className="text-2xl m-2">You're attempting to access a Day page.</h1>
                <h2 className="text-xl m-2">You must be signed in to view this page.</h2>
            </div>
        )
    }
    return (
        <div>
        </div>
    );
}