import { useSession, signIn, signOut } from "next-auth/react";
import { Button, ConfigProvider } from "antd";


export default function UserAccess() {
    const { data: session } = useSession();

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
            {session ? (
                <div>
                    {session.user?.name}
                    <Button type="primary" onClick={() => signOut()} style={{ margin: "1rem" }}>
                        Sign Out
                    </Button>
                </div>

            ) : (
                <Button type="primary" onClick={() => signIn()} style={{ margin: "1rem" }}>
                    Sign In
                </Button>
            )}
        </ConfigProvider>;

    return login;
}