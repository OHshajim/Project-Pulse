import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { Label } from "./label";

export const StarRating = ({
    value,
    onChange,
    label,
}: {
    value: number;
    onChange: (v: number) => void;
    label: string;
}) => (
    <div className="space-y-2">
        <Label>{label}</Label>
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onChange(star)}
                    className={cn(
                        "p-1 rounded transition-all duration-200 hover:scale-110",
                        star <= value ? "text-warning" : "text-muted"
                    )}
                >
                    <Star
                        className={cn(
                            "w-8 h-8",
                            star <= value && "fill-current"
                        )}
                    />
                </button>
            ))}
        </div>
    </div>
);
