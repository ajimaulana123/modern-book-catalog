import type { Book } from "@/lib/types/book";
import { BookCard } from "./BookCard";
import { BookCardSkeleton } from "./BookCardSkeleton";

interface BookGridProps {
  books: Book[];
  isLoading?: boolean;
  itemsPerPage?: number;
}

export const BookGrid = ({ books, isLoading = false, itemsPerPage = 8 }: BookGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: itemsPerPage }).map((_, index) => (
          <BookCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};
