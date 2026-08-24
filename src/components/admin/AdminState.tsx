import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { CircleAlert, LoaderCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function AdminLoading({ label }: { label: string }) {
  return (
    <div className="flex min-h-64 items-center justify-center text-muted-foreground">
      <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
      {label}
    </div>
  );
}

export function AdminEmptyState({
  icon: Icon = CircleAlert,
  title,
  description,
  action,
}: {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex min-h-72 flex-col items-center justify-center text-center">
        <div className="rounded-full bg-muted p-4 text-muted-foreground">
          <Icon className="h-7 w-7" />
        </div>
        <h2 className="mt-4 text-lg font-semibold">{title}</h2>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
        {action && <div className="mt-5">{action}</div>}
      </CardContent>
    </Card>
  );
}
