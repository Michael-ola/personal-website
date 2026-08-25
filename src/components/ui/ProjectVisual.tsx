import Image from "next/image";
import { FiCpu } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { AgricultureArchitecture } from "@/components/ui/AgricultureArchitecture";

export function ProjectVisual({
  src,
  alt,
  priority = false,
  fit = "cover",
  variant = "image",
}: {
  src?: string;
  alt: string;
  priority?: boolean;
  fit?: "cover" | "contain";
  variant?: "image" | "agriculture-architecture";
}) {
  if (variant === "agriculture-architecture") {
    return <AgricultureArchitecture />;
  }

  if (!src) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]">
        <div className="text-center text-[var(--subtle)]">
          <FiCpu className="mx-auto mb-3 h-9 w-9" />
          <p className="font-mono text-xs uppercase tracking-[0.18em]">System visual</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--border)]",
        fit === "contain" ? "bg-white" : "bg-[var(--surface-2)]",
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={cn(
          "transition duration-700 group-hover:scale-[1.015]",
          fit === "contain" ? "object-contain" : "object-cover object-center",
        )}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      {fit === "cover" && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
      )}
    </div>
  );
}
