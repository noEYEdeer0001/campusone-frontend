'use client';

import { ShoppingBag, Search, Car, CalendarDays } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';

const upcomingModules = [
  { icon: ShoppingBag, name: 'Marketplace', description: 'Buy & sell listings from your campus.' },
  { icon: Search, name: 'Lost & Found', description: 'Report and browse lost or found items.' },
  { icon: Car, name: 'Ride Sharing', description: 'Offer or request a ride with fellow students.' },
  { icon: CalendarDays, name: 'Events', description: 'Discover what clubs on campus are hosting.' },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const greetingName = user && 'fullName' in user ? user.fullName.split(' ')[0] : 'there';

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold">Hey {greetingName} 👋</h1>
        <p className="mt-1 text-muted-foreground">
          Here&apos;s what&apos;s happening on your campus.
        </p>
      </div>

      {user && !user.isEmailVerified && (
        <Card className="mb-6 border-accent/40 bg-accent/5">
          <CardContent className="flex items-center justify-between p-4 text-sm">
            <span>Please verify your email to unlock posting on CampusOne.</span>
            <Badge tone="warning">Action needed</Badge>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {upcomingModules.map((m) => (
          <Card key={m.name}>
            <CardHeader className="flex-row items-center gap-3 space-y-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary">
                <m.icon className="h-5 w-5 text-primary dark:text-accent" />
              </div>
              <div>
                <CardTitle className="text-base">{m.name}</CardTitle>
                <CardDescription>{m.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Badge tone="neutral">Coming in a later phase</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
