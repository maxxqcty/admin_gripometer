import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";

interface NotificationsModalProps {
  open: boolean;
  onClose: () => void;
  notifications: { id: number; title: string; description: string }[];
}

export const NotificationsModal = ({ open, onClose, notifications }: NotificationsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2 space-y-3">
          {notifications.length === 0 ? (
            <p className="text-sm text-muted-foreground">No new notifications.</p>
          ) : (
            notifications.map((n) => (
              <div key={n.id} className="p-3 border rounded-lg hover:bg-muted/10 transition">
                <h3 className="font-semibold text-foreground">{n.title}</h3>
                <p className="text-sm text-muted-foreground">{n.description}</p>
              </div>
            ))
          )}
        </div>

        <DialogFooter>
          <Button onClick={onClose} variant="secondary" className="w-full">
            Mark as Read
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
