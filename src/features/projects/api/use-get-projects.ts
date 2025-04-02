import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface UseGetProjectsProps {
  workspaceId: string;
}

// ✅ Fixed API Call
export const useGetProjects = ({ workspaceId }: UseGetProjectsProps) => {
  return useQuery({
    queryKey: ["projects", workspaceId],
    queryFn: async () => {
      // ✅ Correct way to construct API URL with query params
      const url = new URL(`/api/projects`, process.env.NEXT_PUBLIC_API_BASE_URL!);
      url.searchParams.append("workspaceId", workspaceId); // ✅ Correct way to add query param

      // ✅ Correct API call
      const response = await client.call("GET", url, {
        headers: JSON.stringify({ "Content-Type": "application/json" }), // ✅ Correct headers format
      });

      if (!response.ok) {
        throw new Error("❌ Failed to fetch projects");
      }

      return await response.json(); // ✅ Correctly returning JSON response
    },
  });
};
