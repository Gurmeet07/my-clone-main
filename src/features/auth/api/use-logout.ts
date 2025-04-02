import { useMutation } from "@tanstack/react-query";
import { createSessionClient } from "@/lib/rpc";
import { toast } from "sonner";

export const useLogout = () => {
    const mutation = useMutation({
        mutationFn: async () => {
            const { account } = await createSessionClient();
            return await account.deleteSession("current");
        },
        onSuccess: () => {
            toast.success("Logged out successfully!");
        },
        onError: () => {
            toast.error("Failed to log out!");
        },
    });

    return mutation;
};
