// src/providers/dashboardProvider.ts
import {api} from "../api/api.ts"
import { DashboardDTO } from "../dto/dashboard_dto.ts";

export async function fetchDashboardData(): Promise<DashboardDTO> {
  const { data } = await api.get<DashboardDTO>("/api/dashboard");
  return data;
}