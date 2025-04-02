import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface DeleteProjectProps {
  projectId: string;
}

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ projectId }: DeleteProjectProps) => {
      // ✅ Properly Creating a URL
      const url = new URL(`/api/projects/${projectId}`, process.env.NEXT_PUBLIC_API_BASE_URL!);

      // ✅ Correctly Calling API
      const response = await client.call("DELETE", url, {
        headers: JSON.stringify({ "Content-Type": "application/json" }),
      });

      if (!response.ok) {
        throw new Error("❌ Failed to delete project");
      }

      return response.json();
    },
    onSuccess: (_, { projectId }) => {
      toast.success("✅ Project deleted successfully!");

      // ✅ Correct Query Invalidation
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
    onError: () => {
      toast.error("❌ Failed to delete project!");
    },
  });
};
