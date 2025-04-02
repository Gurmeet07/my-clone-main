import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { createSessionClient } from "@/lib/rpc";

export const useRegister = () => {
    const mutation = useMutation({
        mutationFn: async ({ email, password, name }: { email: string; password: string; name: string }) => {
            const { account } = await createSessionClient();
            return await account.create("unique()", email, password, name);
        },
        onSuccess: () => {
            toast.success("Registration successful!");
        },
        onError: () => {
            toast.error("Registration failed!");
        },
    });

    return mutation;
};
