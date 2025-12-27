"use client";

import Link from "next/link";
import { Twitter, Instagram, Facebook } from "lucide-react";
import { useEffect, useState } from "react";

export const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-secondary/50 border-t border-border mt-16">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
          <div className="flex flex-col items-center md:items-start">
             <h2 className="text-4xl font-bold">
                <span className="font-logo text-primary">Beauty</span>
                <span className="font-headline text-3xl text-foreground">Store</span>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Your modern product catalog.
            </p>
          </div>

          <div className="flex space-x-6">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="h-6 w-6" />
              <span className="sr-only">Facebook</span>
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Beauty Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
