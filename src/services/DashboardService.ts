
import { getDashboardDataApi } from "@/constants/api.constant";
import * as opsService from "./Ops";



interface DashboardResponse {
    message: string;
    success: boolean;
    status: number;
    data?: {
        totalUsers: number;
        deActiveUsers: number;
        activeUsers: number;
        totalFAQs: number;
        totalContactUs: number;
    };
}





export const getDashboardData = async (tokenPromise: Promise<string | null>): Promise<DashboardResponse> => {

    const token = await tokenPromise;

    const result = await opsService.getData<DashboardResponse>(getDashboardDataApi, token);

    return result;
};
