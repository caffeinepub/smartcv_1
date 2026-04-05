import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
  className?: string;
}

const STAR_KEYS = ["star-1", "star-2", "star-3", "star-4", "star-5"];

export default function StarRating({
  rating,
  max = 5,
  className,
}: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {STAR_KEYS.slice(0, max).map((key, i) => (
        <Star
          key={key}
          size={14}
          className={
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted"
          }
        />
      ))}
    </div>
  );
}
