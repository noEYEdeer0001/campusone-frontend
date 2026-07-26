import {
  LayoutDashboard,
  ShoppingBag,
  Search,
  Car,
  CalendarDays,
  MessageCircle,
  Bell,
  User,
  Settings,
} from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  comingSoon?: boolean;
}

/**
 * Only Dashboard is a real, built page in Phase 1. Every other item
 * is shown (this is meant to read as a real product, not a partial
 * shell) but marked `comingSoon` -- their routes intentionally do not
 * exist yet, since Marketplace/Lost & Found/Rides/Chat/Events/
 * Notifications/Profile/Settings are explicitly out of scope for this
 * phase per your instructions.
 */
export const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Marketplace', href: '/marketplace', icon: ShoppingBag, comingSoon: true },
  { label: 'Lost & Found', href: '/lost-found', icon: Search, comingSoon: true },
  { label: 'Rides', href: '/rides', icon: Car, comingSoon: true },
  { label: 'Events', href: '/events', icon: CalendarDays, comingSoon: true },
  { label: 'Chat', href: '/chat', icon: MessageCircle, comingSoon: true },
  { label: 'Notifications', href: '/notifications', icon: Bell, comingSoon: true },
  { label: 'Profile', href: '/profile', icon: User, comingSoon: true },
  { label: 'Settings', href: '/settings', icon: Settings, comingSoon: true },
];
