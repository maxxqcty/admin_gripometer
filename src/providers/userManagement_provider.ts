import axios from "axios";
import { UserManagementDTO } from "../dto/userManagement_dto";

export async function fetchUserManagementData(): Promise<UserManagementDTO> {
  const { data } = await axios.get<UserManagementDTO>("/api/user-management");
  return data;
}
