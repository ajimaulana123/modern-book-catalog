'use client';

import Image from 'next/image';
import type { Book } from '@/lib/types/book';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

const StarRating = ({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.25;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
        />
      ))}
      {hasHalfStar && (
        <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          className="h-4 w-4 fill-muted text-muted-foreground/30"
        />
      ))}
    </div>
  );
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const BookCard = ({
  book,
  onBookClick,
}: {
  book: Book;
  onBookClick: (book: Book) => void;
}) => {
  const discountedPrice = book.price * (1 - book.discountPercentage / 100);

  return (
    <div
      onClick={() => onBookClick(book)}
      className="group block cursor-pointer"
    >
      <Card className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 animate-fade-in">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={book.thumbnail}
            alt={book.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          {book.discountPercentage > 0 && (
            <Badge
              variant="destructive"
              className="absolute top-3 right-3 rounded-md"
            >
              {Math.round(book.discountPercentage)}% OFF
            </Badge>
          )}
          <Badge variant="secondary" className="absolute top-3 left-3 rounded-md">
            {book.category}
          </Badge>
        </div>
        <CardContent className="flex flex-1 flex-col p-4">
          <h3 className="font-headline text-lg leading-tight mb-2 flex-grow text-foreground">
            {book.title}
          </h3>

          <div className="mt-4 flex flex-wrap items-end justify-between gap-2">
            <div>
              <div className="flex flex-col items-start gap-0">
                <p className="text-xl font-bold text-primary">
                  {formatCurrency(discountedPrice)}
                </p>
                {book.discountPercentage > 0 && (
                  <p className="text-xs text-muted-foreground line-through">
                    {formatCurrency(book.price)}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <StarRating rating={book.rating} />
              <p className="text-xs text-muted-foreground">
                {book.stock} in stock
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
