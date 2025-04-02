import { Client, Account, Databases } from "node-appwrite"; // ❌ `Users` hata diya
import { AUTH_COOKIE } from "@/features/auth/constants";

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

export async function createSessionClient() {
    if (typeof window !== "undefined") {
        throw new Error("createSessionClient should only be used on the server.");
    }

    const { cookies } = await import("next/headers");

    const session = await cookies().get(AUTH_COOKIE);
    if (!session || !session.value) {
        throw new Error("Unauthorized");
    }

    client.setSession(session.value);

    return {
        client, // ✅ Export `client`
        account: new Account(client),
        databases: new Databases(client),
    };
}

export { client }; // ✅ Explicitly export `client`
