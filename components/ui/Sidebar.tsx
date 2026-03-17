'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Folder, Settings, Moon, Sun, PanelLeftClose, PanelLeftOpen, MessageSquare } from 'lucide-react';
import { useUIStore } from '@/lib/store';
import { useTheme } from 'next-themes';

import { TactileButton } from '@/components/ui/TactileButton';
import { CrunchWrapLogo } from '@/components/CrunchWrapLogo';

export default function Sidebar({ email }: { email?: string }) {
  const { isSidebarOpen, toggleSidebar } = useUIStore();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const navItems = [
    { name: 'Hub', href: '/dashboard/hub', icon: Home },
    { name: 'Files', href: '/dashboard/files', icon: Folder },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col bg-surface border-r border-border transition-all duration-300 h-screen sticky top-0 ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="p-6 flex items-center justify-between h-16 overflow-hidden">
        {isSidebarOpen ? (
          <div className="flex items-center gap-2 truncate">
            <CrunchWrapLogo className="text-primary shrink-0" size={24} />
            <span className="font-serif font-medium text-lg tracking-tight truncate">
              Crunch Wrap
            </span>
          </div>
        ) : (
          <TactileButton
            onClick={toggleSidebar}
            className="flex justify-center w-full p-2 rounded-full hover:bg-foreground/5 transition-colors duration-200 bg-transparent shrink-0"
            aria-label="Expand Sidebar"
          >
            <CrunchWrapLogo className="text-primary shrink-0 hover:scale-105 transition-transform" size={24} />
          </TactileButton>
        )}
        
        {isSidebarOpen && (
          <TactileButton
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-foreground/5 transition-colors duration-200 text-foreground/70 hover:text-foreground bg-transparent shrink-0"
            aria-label="Toggle Sidebar"
          >
            <PanelLeftClose size={20} />
          </TactileButton>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-200 ${
                isActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-foreground/70 hover:bg-foreground/5 hover:text-foreground'
              }`}
            >
              <Icon size={20} className="shrink-0" />
              {isSidebarOpen && <span className="font-sans text-sm">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 flex flex-col gap-2">
        <TactileButton
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex items-center gap-3 px-4 py-3 rounded-full text-foreground/70 hover:bg-foreground/5 transition-colors duration-200 w-full bg-transparent"
          aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={20} className="shrink-0" /> : <Moon size={20} className="shrink-0" />}
          {isSidebarOpen && (
            <span className="font-sans text-sm">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          )}
        </TactileButton>
        {isSidebarOpen && email && (
          <div className="px-4 py-2 text-xs font-mono text-foreground/50 truncate">
            {email}
          </div>
        )}
      </div>
    </aside>
  );
}