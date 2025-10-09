// src/components/data/announcementsData.ts

export type Announcement = {
  id: number
  title: string
  content: string
  type: "maintenance" | "emergency" | "system" | "general" | string
  priority: "high" | "medium" | "low" | string
  status: "published" | "draft" | "scheduled" | "expired" | string
  publishDate: string | null
  expiryDate: string | null
  views: number
  isPinned: boolean
  author: string
}

export const announcements: Announcement[] = [
  {
    id: 1,
    title: "Scheduled Water Interruption - District A",
    content:
      "Water supply will be temporarily interrupted in District A on March 15, 2024, from 8:00 AM to 4:00 PM for pipeline maintenance.",
    type: "maintenance",
    priority: "high",
    status: "published",
    publishDate: "2024-03-10",
    expiryDate: "2024-03-16",
    views: 1247,
    isPinned: true,
    author: "Admin",
  },
  {
    id: 2,
    title: "New Water Conservation Guidelines",
    content:
      "In response to the current dry season, the Municipal Water District is implementing new water conservation measures effective April 1, 2024.",
    type: "general",
    priority: "medium",
    status: "published",
    publishDate: "2024-03-08",
    expiryDate: "2024-04-30",
    views: 892,
    isPinned: false,
    author: "Admin",
  },
  {
    id: 3,
    title: "Billing System Maintenance",
    content:
      "Our online billing system will undergo scheduled maintenance on March 20, 2024, from 12:00 AM to 6:00 AM. During this time, online payments may be temporarily unavailable.",
    type: "system",
    priority: "medium",
    status: "published",
    publishDate: "2024-03-09",
    expiryDate: "2024-03-21",
    views: 654,
    isPinned: false,
    author: "Admin",
  },
  {
    id: 4,
    title: "Water Quality Test Results - February 2024",
    content:
      "We are pleased to announce that all water quality tests conducted in February 2024 have met or exceeded national safety standards.",
    type: "general",
    priority: "low",
    status: "published",
    publishDate: "2024-03-05",
    expiryDate: "2024-03-31",
    views: 423,
    isPinned: false,
    author: "Admin",
  },
  {
    id: 5,
    title: "Emergency Water Supply Protocol Update",
    content:
      "Updated emergency water supply protocols are now in effect. All residents should familiarize themselves with the new procedures.",
    type: "emergency",
    priority: "high",
    status: "draft",
    publishDate: null,
    expiryDate: null,
    views: 0,
    isPinned: false,
    author: "Admin",
  },
]




// export type Announcement = {
//   id: number
//   title: string
//   content: string
//   type: "maintenance" | "emergency" | "system" | "general" | string
//   priority: "high" | "medium" | "low" | string
//   status: "published" | "draft" | "scheduled" | "expired" | string
//   publishDate: string | null
//   expiryDate: string | null
//   views: number
//   isPinned: boolean
//   author: string
// }

// export function useAnnouncements() {
//   const [announcements, setAnnouncements] = useState<Announcement[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetch("http://localhost:8000/api/announcements")
//       .then((res) => res.json())
//       .then((data) => {
//         setAnnouncements(data) // Symfony should return an array of Announcement objects
//         setLoading(false)
//       })
//       .catch((err) => {
//         console.error("Failed to load announcements:", err)
//         setLoading(false)
//       })
//   }, [])

//   return { announcements, loading }
// }
