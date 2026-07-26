'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { navItems } from '@/components/layout/nav-items';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SheetHeader>
          <SheetTitle>CampusOne</SheetTitle>
        </SheetHeader>
        <nav className="mt-4 flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            if (item.comingSoon) {
              return (
                <div
                  key={item.href}
                  className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm text-muted-foreground/60"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4.5 w-4.5" />
                    {item.label}
                  </span>
                  <span className="rounded-full bg-secondary px-1.5 py-0.5 text-[10px] font-medium">
                    Soon
                  </span>
                </div>
              );
            }

            return (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium',
                    isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary',
                  )}
                >
                  <Icon className="h-4.5 w-4.5" />
                  {item.label}
                </Link>
              </SheetClose>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
