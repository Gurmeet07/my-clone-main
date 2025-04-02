import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface useGetProjectAnalyticsProps {
    projectId: string;
}

export type ProjectAnalyticsResponseType = {
    taskCount: number;
    taskDifference: number;
    assignedTaskCount: number;
    assignedTaskDifference: number;
    completedTaskCount: number;
    completedTaskDifference: number;
    overdueTaskCount: number;
    overdueTaskDifference: number;
    incompleteTaskCount: number;
    incompleteTaskDifference: number;
};

export const useGetProjectAnalytics = ({ projectId }: useGetProjectAnalyticsProps) => {
    return useQuery<ProjectAnalyticsResponseType>({
        queryKey: ["project-analytics", projectId],
        queryFn: async () => {
            const url = new URL(`/projects/${projectId}/update`, process.env.NEXT_PUBLIC_API_BASE_URL);
const response = await client.call("POST", url);


            if (!response.ok) {
                throw new Error("Failed to fetch project analytics");
            }

            return response.json();
        },
    });
};
