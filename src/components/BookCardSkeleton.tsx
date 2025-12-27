import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const BookCardSkeleton = () => {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <CardHeader className="p-0">
        <Skeleton className="aspect-[4/3] w-full" />
      </CardHeader>
      <CardContent className="flex flex-1 flex-col p-4">
        <div className="flex-1">
          <Skeleton className="mb-2 h-5 w-1/4" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6 mt-1" />
        </div>
        <div className="mt-4 flex items-end justify-between gap-2">
            <div>
                <Skeleton className="h-7 w-24 mb-1" />
                <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-4 w-16" />
        </div>
      </CardContent>
    </Card>
  );
};
