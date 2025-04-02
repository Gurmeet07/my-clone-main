import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface CreateProjectProps {
  name: string;
  description?: string;
  workspaceId: string;
}

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, description, workspaceId }: CreateProjectProps) => {
      const url = new URL("/api/projects", process.env.NEXT_PUBLIC_API_BASE_URL);

      const response = await client.call("POST", url, {
        body: JSON.stringify({ name, description, workspaceId }),
        headers: JSON.stringify({ "Content-Type": "application/json" }), // ✅ Fix
      });

      if (!response.ok) {
        throw new Error("❌ Failed to create project");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("✅ Project created successfully!");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: () => {
      toast.error("❌ Failed to create project!");
    },
  });
};
