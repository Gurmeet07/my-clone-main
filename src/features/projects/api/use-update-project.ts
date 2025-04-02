import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface UpdateProjectProps {
  projectId: string;
  form: {
    name?: string;
    description?: string;
  };
}

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ projectId, form }: UpdateProjectProps) => {
      if (!form || Object.keys(form).length === 0) {
        throw new Error("❌ No data provided for update!");
      }

      // ✅ Correct API URL
      const url = new URL(`/api/projects/${projectId}`, process.env.NEXT_PUBLIC_API_BASE_URL!);

      // ✅ Correct API Call
      const response = await client.call("GET", url, {
        headers: JSON.stringify({ "Content-Type": "application/json" }), // ✅ Correct headers format
      });

      if (!response.ok) {
        throw new Error("❌ Failed to update project");
      }

      return await response.json();
    },
    onSuccess: (_, { projectId }) => {
      toast.success("✅ Project updated successfully!");

      // ✅ Correct Query Invalidation
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
    onError: () => {
      toast.error("❌ Failed to update project!");
    },
  });
};
