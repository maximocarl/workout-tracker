import "./globals.css";
import Nav from "../lib/components/nav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SessionWrapper from "../lib/components/SessionProvider";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <SessionWrapper session={session}>
          <Nav />
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
