import { GitBranch } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import {
  PRODUCT_NAME,
  PRODUCT_TAGLINE,
  PRODUCT_WORKSPACE_LABEL,
} from "@/shared/lib/brand";

type ProductMarkProps = {
  className?: string;
  iconClassName?: string;
};

export function ProductMark({ className, iconClassName }: ProductMarkProps) {
  return (
    <div className={cn("product-mark", className)}>
      <GitBranch className={cn("h-4 w-4", iconClassName)} strokeWidth={2.5} />
    </div>
  );
}

type ProductBrandProps = {
  className?: string;
  compact?: boolean;
  eyebrow?: string;
};

export function ProductBrand({
  className,
  compact = false,
  eyebrow = PRODUCT_TAGLINE,
}: ProductBrandProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <ProductMark className={compact ? "h-9 w-9 rounded-xl" : undefined} />
      <div>
        <p className={cn("font-semibold tracking-tight", compact ? "text-lg" : "text-sm")}>
          {PRODUCT_NAME}
        </p>
        <p className="text-xs text-muted-foreground">
          {eyebrow}
        </p>
      </div>
    </div>
  );
}

export function ProductWorkspaceBrand({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-3 rounded-full border border-border/80 bg-background/60 px-4 py-2", className)}>
      <ProductMark className="h-9 w-9 rounded-xl" iconClassName="h-5 w-5" />
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {PRODUCT_NAME}
        </p>
        <p className="text-xs text-muted-foreground">
          {PRODUCT_WORKSPACE_LABEL}
        </p>
      </div>
    </div>
  );
}
