import { BellRing, Clock3, TriangleAlert } from "lucide-react";
import { NotificationItem } from "@/lib/types";
import { SurfaceCard } from "@/components/ui/surface-card";

const appearance = {
  expiring: {
    icon: Clock3,
    accent: "text-[#A85F00]",
    bg: "bg-[#FFF5E7]"
  },
  expired: {
    icon: TriangleAlert,
    accent: "text-[#B24034]",
    bg: "bg-[#FFF0EE]"
  },
  "low-stock": {
    icon: BellRing,
    accent: "text-preserve.leaf",
    bg: "bg-preserve.mint"
  },
  reminder: {
    icon: BellRing,
    accent: "text-preserve.ink",
    bg: "bg-[#EDF5FF]"
  }
};

export const NotificationCard = ({ notification }: { notification: NotificationItem }) => {
  const config = appearance[notification.type];
  const Icon = config.icon;

  return (
    <SurfaceCard className="flex items-start gap-4 p-4">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${config.bg} ${config.accent}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="font-medium text-preserve.ink">{notification.title}</p>
        <p className="mt-1 text-sm leading-6 text-preserve.slate">{notification.description}</p>
      </div>
    </SurfaceCard>
  );
};
