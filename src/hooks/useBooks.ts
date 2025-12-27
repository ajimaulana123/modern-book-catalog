"use client";

import { useState, useEffect } from "react";
import type { Book, BookApiResponse } from "@/lib/types/book";
import { useToast } from "@/hooks/use-toast";

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://dummyjson.com/products?limit=100");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: BookApiResponse = await response.json();
        // The API returns 'smartphones' and other items, let's filter for book-like things
        const bookCategories = ["groceries", "home-decoration", "furniture", "lighting"];
        const filteredProducts = data.products.filter(p => !bookCategories.includes(p.category));

        setBooks(filteredProducts);
      } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : "Terjadi kesalahan yang tidak diketahui";
        setError(errorMessage);
        toast({
          variant: "destructive",
          title: "Oops! Terjadi kesalahan.",
          description: `Ada masalah saat mengambil data buku: ${errorMessage}`,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [toast]);

  return { books, loading, error };
};
