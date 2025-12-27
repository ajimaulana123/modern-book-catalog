"use client";

import { useState, useMemo } from "react";
import type { Book } from "@/lib/types/book";
import { useBooks } from "@/hooks/useBooks";

import { SearchBar } from "@/components/SearchBar";
import { BookGrid } from "@/components/BookGrid";
import { Loader } from "@/components/Loader";
import { EmptyState } from "@/components/EmptyState";
import { Pagination } from "@/components/Pagination";

const ITEMS_PER_PAGE = 8;

export default function Home() {
  const { books, loading, error } = useBooks();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBooks = useMemo(() => {
    if (!books) return [];
    const query = searchQuery.toLowerCase().trim();
    if (!query) return books;

    return books.filter(
      (book: Book) =>
        book.title.toLowerCase().includes(query) ||
        book.description.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query)
    );
  }, [books, searchQuery]);

  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);

  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredBooks.slice(startIndex, endIndex);
  }, [filteredBooks, currentPage]);
  
  // Reset to page 1 when search query changes
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery]);


  if (loading) {
    return <Loader />;
  }

  if (error) {
    // Error will be shown as a toast, but we can have a fallback UI
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-destructive-foreground">Gagal memuat buku. Silakan coba lagi nanti.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            LitFolio
          </h1>
          <p className="mt-3 text-lg text-muted-foreground sm:mt-4">
            Katalog buku modern Anda, tertata dengan indah.
          </p>
        </header>

        <div className="mb-8 max-w-2xl mx-auto">
          <SearchBar
            value={searchQuery}
            onSearch={setSearchQuery}
            placeholder="Cari berdasarkan judul, kategori, atau deskripsi..."
          />
        </div>

        {paginatedBooks.length > 0 ? (
          <>
            <BookGrid books={paginatedBooks} />
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        ) : (
          <EmptyState />
        )}
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} LitFolio. Semua hak dilindungi undang-undang.</p>
      </footer>
    </div>
  );
}
