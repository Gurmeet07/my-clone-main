import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { createSessionClient } from "@/lib/rpc";

export const useLogin = () => {
    const mutation = useMutation({
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            const { account } = await createSessionClient();
            return await account.createSession(email, password);
        },
        onSuccess: () => {
            toast.success("Logged in successfully!");
        },
        onError: () => {
            toast.error("Failed to log in!");
        },
    });

    return mutation;
};
