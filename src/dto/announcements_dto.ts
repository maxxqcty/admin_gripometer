// src/dto/announcement.dto.ts

export type AnnouncementDTO = {
  id: number;
  title: string;
  content: string;
  type: "maintenance" | "emergency" | "system" | "general" | string;
  priority: "high" | "medium" | "low" | string;
  status: "published" | "draft" | "scheduled" | "expired" | string;
  publishDate: string | null;
  expiryDate: string | null;
  views: number;
  isPinned: boolean;
  author: string;
};
