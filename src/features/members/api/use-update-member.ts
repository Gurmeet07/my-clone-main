import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface UpdateMemberProps {
  memberId: string;
  data: { name?: string; role?: string }; // 🛠️ Define expected update fields
}

export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ memberId, data }: UpdateMemberProps) => {
      // ✅ Correct API Call
      const url = new URL(`/api/members/${memberId}`, process.env.NEXT_PUBLIC_API_BASE_URL);
      const response = await client.call("PATCH", url, { body: JSON.stringify(data) });

      if (!response.ok) {
        throw new Error("Failed to update member");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("✅ Member updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["members"] }); // Refresh members list
    },
    onError: () => {
      toast.error("❌ Failed to update member!");
    },
  });
};
