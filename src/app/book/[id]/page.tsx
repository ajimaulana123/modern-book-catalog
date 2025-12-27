'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Book } from '@/lib/types/book';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Star, StarHalf, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const StarRating = ({ rating, className }: { rating: number; className?: string }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.25;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="h-5 w-5 fill-yellow-400 text-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-5 w-5 fill-muted text-muted-foreground/30" />
      ))}
    </div>
  );
};

const formatCurrency = (amount: number) => {
  const idrAmount = amount * 15000;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(idrAmount);
};

const BookDetailSkeleton = () => (
  <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-pulse">
    <div className="w-32 h-10 bg-muted rounded-md mb-8"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
      <div className="bg-muted aspect-[4/3] rounded-lg"></div>
      <div>
        <div className="h-10 w-3/4 bg-muted rounded-md mb-4"></div>
        <div className="h-6 w-1/4 bg-muted rounded-md mb-6"></div>
        <div className="h-8 w-1/2 bg-muted rounded-md mb-4"></div>
        <div className="h-5 w-1/3 bg-muted rounded-md mb-8"></div>
        <div className="space-y-2">
            <div className="h-4 w-full bg-muted rounded-md"></div>
            <div className="h-4 w-full bg-muted rounded-md"></div>
            <div className="h-4 w-5/6 bg-muted rounded-md"></div>
        </div>
        <div className="mt-8 h-12 w-48 bg-muted rounded-md"></div>
      </div>
    </div>
  </div>
);

export default function BookDetailPage({ params }: { params: { id: string } }) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { id } = params;

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            notFound();
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Book = await response.json();
        setBook(data);
      } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : 'Terjadi kesalahan yang tidak diketahui';
        toast({
          variant: 'destructive',
          title: 'Oops! Terjadi kesalahan.',
          description: `Ada masalah saat mengambil data buku: ${errorMessage}`,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, toast]);

  if (loading) {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header onSearch={() => {}} searchQuery="" />
            <main className="flex-grow">
                <BookDetailSkeleton />
            </main>
            <Footer />
        </div>
    );
  }

  if (!book) {
    return null; // or a not found component
  }
  
  const discountedPrice = book.price * (1 - book.discountPercentage / 100);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onSearch={() => {}} searchQuery="" />
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-grow">
        <div className="mb-8">
            <Button asChild variant="outline" className="gap-2">
                <Link href="/">
                    <ChevronLeft className="h-4 w-4" />
                    Kembali
                </Link>
            </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          <div className="w-full">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-lg">
                <Image
                src={book.thumbnail}
                alt={book.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                />
            </div>
            {/* You can add a gallery for more images here if you want */}
          </div>
          <div className="flex flex-col">
            <Badge variant="secondary" className="w-fit mb-2">{book.category}</Badge>
            <h1 className="font-headline text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {book.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
                <StarRating rating={book.rating} />
                <span className="text-muted-foreground text-sm">({book.reviews.length} ulasan)</span>
            </div>

            <div>
              <p className="text-4xl font-bold text-primary mb-1">
                {formatCurrency(discountedPrice)}
              </p>
              {book.discountPercentage > 0 && (
                 <div className="flex items-center gap-2 text-lg">
                    <p className="text-muted-foreground line-through">
                    {formatCurrency(book.price)}
                    </p>
                    <Badge variant="destructive">{book.discountPercentage}% OFF</Badge>
                </div>
              )}
            </div>
            
            <Separator className="my-8"/>

            <p className="text-muted-foreground leading-relaxed mb-8">
              {book.description}
            </p>
            
            <div className="flex items-center gap-4 text-sm text-foreground mb-8">
                <span>Stok: <span className="font-semibold">{book.stock}</span></span>
                <Separator orientation="vertical" className="h-4"/>
                <span>Merek: <span className="font-semibold">{book.brand}</span></span>
            </div>

            <Button size="lg" className="mt-auto w-full sm:w-auto">Tambah ke Keranjang</Button>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
