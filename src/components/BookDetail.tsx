'use client';

import Image from 'next/image';
import type { Book } from '@/lib/types/book';
import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
          className="h-5 w-5 fill-yellow-400 text-yellow-400"
        />
      ))}
      {hasHalfStar && (
        <StarHalf className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          className="h-5 w-5 fill-muted text-muted-foreground/30"
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

export function BookDetail({ book }: { book: Book }) {
  const discountedPrice = book.price * (1 - book.discountPercentage / 100);

  return (
    <div className="p-2 sm:p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="w-full">
            <Carousel className="w-full">
                <CarouselContent>
                {book.images.map((img, index) => (
                    <CarouselItem key={index}>
                    <div className="p-1">
                        <Card>
                        <CardContent className="relative aspect-video flex items-center justify-center p-0 overflow-hidden rounded-lg">
                            <Image
                                src={img}
                                alt={`${book.title} - image ${index + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-contain"
                            />
                        </CardContent>
                        </Card>
                    </div>
                    </CarouselItem>
                ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
            </Carousel>
        </div>
        <div className="flex flex-col">
          <Badge variant="secondary" className="w-fit mb-2">
            {book.category}
          </Badge>
          <h1 className="font-headline text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {book.title}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <StarRating rating={book.rating} />
            <span className="text-muted-foreground text-sm">
              ({book.reviews?.length || 0} reviews)
            </span>
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
                <Badge variant="destructive">{Math.round(book.discountPercentage)}% OFF</Badge>
              </div>
            )}
          </div>

          <Separator className="my-6" />
          
          <div className="flex items-center gap-4 text-sm text-foreground mb-6">
                <span>Stock: <span className="font-semibold">{book.stock}</span></span>
                <Separator orientation="vertical" className="h-4"/>
                <span>Brand: <span className="font-semibold">{book.brand}</span></span>
            </div>

          <Tabs defaultValue="description" className="w-full">
            <TabsList className='mb-4'>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="text-muted-foreground leading-relaxed">
              {book.description}
            </TabsContent>
            <TabsContent value="details">
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><span className="font-semibold text-foreground">SKU:</span> {book.sku}</li>
                    <li><span className="font-semibold text-foreground">Weight:</span> {book.weight}g</li>
                    <li><span className="font-semibold text-foreground">Dimensions:</span> {book.dimensions.width} x {book.dimensions.height} x {book.dimensions.depth} cm</li>
                    <li><span className="font-semibold text-foreground">Warranty:</span> {book.warrantyInformation}</li>
                    <li><span className="font-semibold text-foreground">Shipping:</span> {book.shippingInformation}</li>
                    <li><span className="font-semibold text-foreground">Return Policy:</span> {book.returnPolicy}</li>
                    {book.tags?.length > 0 && <li><span className="font-semibold text-foreground">Tags:</span> {book.tags.join(', ')}</li>}
                </ul>
            </TabsContent>
            <TabsContent value="reviews">
                {book.reviews?.length > 0 ? (
                     <div className="space-y-4">
                        {book.reviews.map((review, index) => (
                            <div key={index} className="border-b pb-4 last:border-b-0">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-semibold text-foreground">{review.reviewerName}</h4>
                                    <StarRating rating={review.rating}/>
                                </div>
                                <p className="text-sm text-muted-foreground">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                ): (
                    <p className="text-sm text-muted-foreground">No reviews yet.</p>
                )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
