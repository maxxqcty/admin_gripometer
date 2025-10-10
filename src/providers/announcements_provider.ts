
// src/providers/announcementsProvider.ts
import { api } from "../api/api.ts"; // Axios or your API wrapper
import { AnnouncementDTO } from "../dto/announcements_dto.ts"

export class AnnouncementsProvider {
  // Fetch all announcements
  static async fetchAll(): Promise<AnnouncementDTO[]> {
    try {
      const { data } = await api.get<AnnouncementDTO[]>("/api/announcements");
      return data;
    } catch (error) {
      console.error("Failed to fetch announcements:", error);
      return [];
    }
  }

  // Fetch a single announcement by ID
  static async fetchById(id: number): Promise<AnnouncementDTO | null> {
    try {
      const { data } = await api.get<AnnouncementDTO>(`/api/announcements/${id}`);
      return data;
    } catch (error) {
      console.error(`Failed to fetch announcement ${id}:`, error);
      return null;
    }
  }

  // Optionally, fetch only pinned announcements
  static async fetchPinned(): Promise<AnnouncementDTO[]> {
    try {
      const { data } = await api.get<AnnouncementDTO[]>("/api/announcements?pinned=true");
      return data;
    } catch (error) {
      console.error("Failed to fetch pinned announcements:", error);
      return [];
    }
  }
}
