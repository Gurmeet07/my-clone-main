import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface UseGetProjectProps {
  projectId: string;
}

// ✅ Fixed: Using correct API call
export const useGetProject = ({ projectId }: UseGetProjectProps) => {
  return useQuery({
    queryKey: ["project", projectId], 
    queryFn: async () => {
      // ✅ Correct way to construct API URL
      const url = new URL(`/api/projects/${projectId}`, process.env.NEXT_PUBLIC_API_BASE_URL!);

      // ✅ Fixed API Call
      const response = await client.call("GET", url, {
        headers: JSON.stringify({ "Content-Type": "application/json" }), // ✅ Correct headers format
      });

      if (!response.ok) {
        throw new Error("❌ Failed to fetch project");
      }

      return await response.json(); // ✅ Correctly returning JSON
    },
  });
};
