"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ value, onSearch, placeholder }: SearchBarProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder || "Search..."}
        className="w-full rounded-md border-border bg-card py-2 pl-12 pr-4 h-12 text-base shadow-sm focus:bg-background"
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        aria-label="Search books"
      />
    </div>
  );
};
