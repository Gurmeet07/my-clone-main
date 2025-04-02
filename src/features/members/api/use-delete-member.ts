import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  return useMutation<
    unknown, // Response type ko unknown rakhte hain, kyunki API structure confirm nahi hai
    Error,
    { memberId: string } // Corrected request type
  >({
    mutationFn: async ({ memberId }) => {
      const url = new URL(`/api/members/${memberId}`, process.env.NEXT_PUBLIC_API_BASE_URL); // ✅ Convert string to URL
    
      const response = await client.call("DELETE", url);
    
      if (!response.ok) {
        throw new Error("Failed to delete member");
      }
    
      return response.json();
    },
    
    onSuccess: () => {
      toast.success("✅ Member deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: () => {
      toast.error("❌ Failed to delete member!");
    },
  });
};
