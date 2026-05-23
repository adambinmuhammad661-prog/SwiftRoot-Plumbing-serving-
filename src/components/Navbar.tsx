import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Droplet, Sun, Moon, Phone, Menu, X, ShieldAlert, Award } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  onOpenBooking: () => void;
  onScrollTo: (elementId: string) => void;
}

export default function Navbar({ isDark, toggleTheme, onOpenBooking, onScrollTo }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Services', id: 'services' },
    { name: 'Emergency Center', id: 'emergency' },
    { name: 'Coverage Area', id: 'coverage' },
    { name: 'Reviews', id: 'reviews' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-panel-light dark:glass-panel-dark transition-all duration-300 shadow-sm border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onScrollTo('hero')}>
            <motion.div 
              className="bg-gradient-to-tr from-primary-600 to-secondary-600 p-2.5 rounded-2xl relative"
              whileHover={{ rotate: 15, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Droplet className="h-6 w-6 text-white stroke-[2.5]" />
              <motion.span 
                className="absolute -top-1 -right-1 flex h-3 w-3"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </motion.span>
            </motion.div>
            
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-display font-extrabold text-2xl tracking-tight bg-gradient-to-r from-primary-600 via-red-500 to-secondary-600 bg-clip-text text-transparent">
                  SwiftRoot
                </span>
                <span className="font-sans font-medium text-[10px] uppercase px-1.5 py-0.5 rounded bg-primary-50 dark:bg-slate-800 text-primary-600 dark:text-primary-400 tracking-wider">
                  Plumbing
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                Liverpool 24/7 Dispatch
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onScrollTo(item.id)}
                className="text-sm font-semibold text-slate-600 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400 transition-colors cursor-pointer relative py-2"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Action Tools */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Live Indicator Alert */}
            <div className="flex items-center space-x-2 bg-gradient-to-r from-red-50 to-rose-100/30 dark:from-red-950/20 dark:to-slate-900 border border-red-200/50 dark:border-red-900/30 px-3.5 py-1.5 rounded-full select-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[11px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider font-mono">
                Emergency dispatchers active
              </span>
            </div>

            {/* Dark/Light Switch */}
            <motion.button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
            </motion.button>

            {/* Emergency Booking Trigger */}
            <motion.button
              onClick={onOpenBooking}
              className="bg-gradient-to-r from-primary-600 to-red-500 hover:from-primary-700 hover:to-red-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-red-500/25 flex items-center space-x-2 hover:shadow-red-500/35 transition-all outline-none"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <Phone className="h-4 w-4 animate-bounce" />
              <span>Book 24/7 Service</span>
            </motion.button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Dark/Light Switch */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-3">
              <div className="flex items-center justify-between p-3.5 bg-red-50/50 dark:bg-red-950/20 border border-red-200/40 dark:border-red-900/40 rounded-xl mb-2">
                <span className="flex items-center space-x-2">
                  <ShieldAlert className="h-4 w-4 text-red-500" />
                  <span className="text-xs font-bold text-red-600 dark:text-red-400">Emergency Dispatch Active</span>
                </span>
                <span className="text-[10px] font-mono bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">LIVE</span>
              </div>

              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setIsOpen(false);
                    onScrollTo(item.id);
                  }}
                  className="block w-full text-left px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/50 rounded-xl transition-all"
                >
                  {item.name}
                </button>
              ))}

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full bg-gradient-to-r from-primary-600 to-red-500 hover:from-primary-700 hover:to-red-600 text-white font-semibold text-center py-3.5 rounded-xl shadow-lg shadow-red-500/20 flex items-center justify-center space-x-2"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call & Book (Liverpool)</span>
                </button>
                <a
                  href="mailto:adambinmuhammad661@gmail.com"
                  className="block w-full text-center py-3 text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded-xl transition-colors"
                >
                  Email Support
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
