import { useQuery } from "@tanstack/react-query";
import { createSessionClient } from "@/lib/rpc";

export const useCurrent = () => {
    return useQuery({
        queryKey: ["current"],
        queryFn: async () => {
            try {
                const client = await createSessionClient();
                return await client.account.get();
            } catch (error) {
                console.error(error); // 👈 Isse error print ho jayega
                return null;
            }
        },
        retry: false,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
    });
};
