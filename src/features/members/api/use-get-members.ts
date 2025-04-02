import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface useGetMembersProps {
  workspaceId: string;
}

// Custom hook to fetch members for a specific workspace
export const useGetMembers = ({ workspaceId }: useGetMembersProps) => {
  return useQuery({
    queryKey: ["members", workspaceId],
    queryFn: async () => {
      // ✅ Correct API Call
      const url = new URL(`/api/members?workspaceId=${workspaceId}`, process.env.NEXT_PUBLIC_API_BASE_URL);
      const response = await client.call("GET", url); // ✅ Use 'client.call("GET", url)'

      if (!response.ok) {
        throw new Error("Failed to fetch members");
      }

      return response.json(); // ✅ Directly return JSON response
    },
  });
};
