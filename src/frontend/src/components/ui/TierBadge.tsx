import { cn } from "@/lib/utils";
import type { UserPlan } from "../../context/AuthContext";

interface TierBadgeProps {
  plan: UserPlan;
  className?: string;
}

export default function TierBadge({ plan, className }: TierBadgeProps) {
  const labels: Record<UserPlan, string> = {
    free: "Free",
    paid: "Pro",
    premium: "Premium",
  };
  const classes: Record<UserPlan, string> = {
    free: "badge-free",
    paid: "badge-paid",
    premium: "badge-premium",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold",
        classes[plan],
        className,
      )}
    >
      {labels[plan]}
    </span>
  );
}
