import { SearchX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const EmptyState = () => {
  return (
    <div className="flex min-h-[40vh] items-center justify-center rounded-lg border-2 border-dashed border-border bg-card/50">
      <div className="text-center p-8">
        <SearchX className="mx-auto h-16 w-16 text-muted-foreground" />
        <h2 className="mt-4 text-2xl font-headline font-semibold text-foreground">
          Tidak Ada Buku yang Ditemukan
        </h2>
        <p className="mt-2 text-muted-foreground">
          Pencarian Anda tidak cocok dengan buku apa pun. <br />
          Coba cari yang lain.
        </p>
      </div>
    </div>
  );
};
