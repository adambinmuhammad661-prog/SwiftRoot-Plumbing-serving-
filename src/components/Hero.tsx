import { motion } from 'motion/react';
import { ArrowRight, Flame, Clock, ShieldCheck, Star, Users, CheckCircle } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onScrollTo: (elementId: string) => void;
}

export default function Hero({ onOpenBooking, onScrollTo }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-12 md:py-24 bg-hero-radial">
      {/* Curved background shapes */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-red-400/10 rounded-full blur-3xl pointer-events-none -mr-48"></div>
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none -ml-48"></div>
      
      {/* Curved shape boundary at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg className="relative block w-full h-[60px] md:h-[100px] text-slate-50 dark:text-slate-950 fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C150,90 350,120 600,100 C850,80 1050,110 1200,90 L1200,120 L0,120 Z"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text and information */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-center lg:text-left">
            {/* Tagline */}
            <motion.div 
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500/10 via-red-500/5 to-blue-500/10 border border-slate-200 dark:border-slate-800 rounded-full px-4 py-1.5 self-center lg:self-start w-fit shadow-xs"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 tracking-wide uppercase">
                🔴 No Call-Out Charge in Liverpool & Merseyside
              </span>
            </motion.div>

            {/* Main Catchphrase */}
            <motion.h1 
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-slate-900 dark:text-white leading-[1.1]"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Rapid Plumbing & Repairs <br />
              <span className="bg-gradient-to-r from-primary-600 via-rose-500 to-secondary-600 bg-clip-text text-transparent">
                Across Liverpool
              </span>
            </motion.h1>

            {/* Subtitle description */}
            <motion.p 
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              From burst water mains to central boiler replacements, SwiftRoot delivers Gas-Safe registered plumbing solutions. On-duty engineers dispatched locally with an average arrival of 22 minutes.
            </motion.p>

            {/* Action buttons list */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button
                onClick={() => onScrollTo('emergency')}
                className="w-full sm:w-auto bg-gradient-to-r from-primary-600 to-red-500 text-white font-bold text-base px-8 py-4 rounded-2xl shadow-xl shadow-red-500/20 hover:shadow-red-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center space-x-2 border border-primary-500/20"
              >
                <Flame className="h-5 w-5 text-amber-200 animate-pulse" />
                <span>Emergency Dispatcher</span>
              </button>

              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-100 font-bold text-base px-8 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center space-x-2"
              >
                <span>Book Regular Job</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>

            {/* Quick stats grid */}
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center space-x-3">
                <div className="bg-red-500/10 p-2 rounded-xl text-primary-600 dark:text-primary-400">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-lg text-slate-900 dark:text-white leading-none">22 min</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Avg Liverpool ETA</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-blue-500/10 p-2 rounded-xl text-secondary-600 dark:text-secondary-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-lg text-slate-900 dark:text-white leading-none">Gas-Safe</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Certified Engineers</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 col-span-2 sm:col-span-1 border-t sm:border-t-0 border-slate-200/50 dark:border-slate-800/50 pt-3 sm:pt-0">
                <div className="bg-amber-500/10 p-2 rounded-xl text-amber-600 dark:text-amber-400">
                  <Star className="h-5 w-5 fill-amber-500/20" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-lg text-slate-900 dark:text-white leading-none">1,250+</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium font-sans">Liverpool Reviews</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Graphical floating elements column */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Visual background circle frame */}
            <div className="absolute w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] bg-gradient-to-br from-red-500 via-rose-500 to-blue-600 rounded-[4rem] rotate-12 opacity-5 blur-xl pointer-events-none"></div>

            {/* Creative floating container card */}
            <motion.div 
              className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-slate-300/40 dark:shadow-slate-950/80 border border-slate-200/60 dark:border-slate-800/80 p-6 sm:p-8 relative select-none animate-float"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              
              {/* Header inside floating dashboard card */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 animate-pulse"></span>
                    <div className="bg-gradient-to-bl from-primary-600 to-secondary-600 text-white rounded-2xl p-2.5 font-bold font-display text-sm">
                      SW
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-sm text-slate-900 dark:text-white leading-tight">Liverpool Crew</h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium font-sans">Live Area Monitor</p>
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 rounded-xl px-3 py-1 text-[11px] font-bold font-mono border border-slate-100 dark:border-slate-700/50">
                  L1 - L38 Cover
                </div>
              </div>

              {/* Body inside floating dashboard card */}
              <div className="space-y-4 pt-6">
                
                {/* Active Engineers */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/50">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-primary-500" />
                    <div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Engineers On Location</p>
                      <h4 className="font-display font-extrabold text-sm text-slate-800 dark:text-white">Liverpool & Environs</h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-1 rounded-lg">
                      12 Active
                    </span>
                  </div>
                </div>

                {/* Average Wait */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/50">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-secondary-500" />
                    <div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Average Response Clock</p>
                      <h4 className="font-display font-extrabold text-sm text-slate-800 dark:text-white">Immediate Dispatch</h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 px-2.5 py-1 rounded-lg">
                      &lt; 25 mins
                    </span>
                  </div>
                </div>

                {/* Live Activity Feed Simulator */}
                <div className="pt-2">
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase tracking-widest pb-3 font-mono">
                    Recent dispatches
                  </p>
                  <div className="space-y-2.5">
                    <div className="flex items-start space-x-2.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
                        <span className="font-bold text-slate-800 dark:text-slate-200">L8 (Toxteth)</span> • Burst pipe emergency isolated in 18m.
                      </p>
                    </div>

                    <div className="flex items-start space-x-2.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
                        <span className="font-bold text-slate-800 dark:text-slate-200">L18 (Mossley Hill)</span> • Boiler failure restored.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Decorative design anchor tag */}
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-tr from-secondary-600 to-primary-600 text-white p-4.5 rounded-[2rem] shadow-xl hover:-translate-y-1 transition-all cursor-pointer" onClick={() => onScrollTo('coverage')}>
                <p className="text-[9px] uppercase tracking-widest font-extrabold font-mono opacity-85">Duty Desk</p>
                <h4 className="font-display font-extrabold text-xs">View Map &gt;</h4>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
