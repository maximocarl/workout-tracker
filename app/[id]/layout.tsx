import { getServerSession } from "next-auth";

export default async function Page({ children }: { children: React.ReactNode }) {
    // const session = await getServerSession();
    // if (!session) {
    //     return (
    //         <div>
    //             <h1 className="text-2xl m-2">You&apos;re attempting to access a Day page.</h1>
    //             <h2 className="text-xl m-2">You must be signed in to view this page.</h2>
    //         </div>
    //     )
    // }
    return (
        <div className="m-2">
            {children}
        </div>
    );
}