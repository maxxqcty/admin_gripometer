import { Megaphone, Send, Users, Clock } from "lucide-react";
import { SummaryCard } from "./_summaryCard";

export function SummaryCardsSection() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <SummaryCard
        title="Total Announcements"
        value={24}
        subtitle="All time"
        icon={<Megaphone className="h-5 w-5 text-primary" />}
        iconBg="bg-primary/10"
      />
      <SummaryCard
        title="Published"
        value={18}
        subtitle="Currently active"
        icon={<Send className="h-5 w-5 text-green-600" />}
        iconBg="bg-green-500/10"
      />
      <SummaryCard
        title="Total Views"
        value="15,243"
        subtitle="This month"
        icon={<Users className="h-5 w-5 text-blue-600" />}
        iconBg="bg-blue-500/10"
      />
      <SummaryCard
        title="Drafts"
        value={3}
        subtitle="Pending publication"
        icon={<Clock className="h-5 w-5 text-orange-600" />}
        iconBg="bg-orange-500/10"
      />
    </div>
  );
}
