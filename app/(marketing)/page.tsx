import Link from 'next/link';
import { ShoppingBag, Search, Car, CalendarDays, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ThemeToggle } from '@/components/layout/theme-toggle';

const modules = [
  { icon: ShoppingBag, name: 'Marketplace', description: 'Buy and sell with students on your campus.' },
  { icon: Search, name: 'Lost & Found', description: 'Report and recover lost items, fast.' },
  { icon: Car, name: 'Ride Sharing', description: 'Split a ride to the station, the mall, home.' },
  { icon: CalendarDays, name: 'Events', description: 'Never miss what your campus clubs are hosting.' },
  { icon: MessageCircle, name: 'Chat', description: 'Message sellers, drivers, and posters directly.' },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center justify-between border-b border-border px-4 md:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary font-display text-sm font-bold text-primary-foreground">
            C1
          </div>
          <span className="font-display text-lg font-semibold">CampusOne</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Get started</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
            One Campus.
            <br />
            <span className="text-primary dark:text-accent">One App.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Buy &amp; sell, recover lost items, share rides, and stay on top of campus events --
            everything your university needs, verified student to verified student.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/register">
                Create your account <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">I already have an account</Link>
            </Button>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-24">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {modules.map((m) => (
              <Card key={m.name} className="text-left">
                <CardContent className="p-5">
                  <m.icon className="mb-3 h-6 w-6 text-primary dark:text-accent" />
                  <p className="font-display font-semibold">{m.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{m.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-6 py-6 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} CampusOne. Built for students, by students.
      </footer>
    </div>
  );
}
