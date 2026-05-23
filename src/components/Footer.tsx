import { Droplet, PhoneCall, Mail, MapPin, ShieldCheck, Award, Lock, ExternalLink } from 'lucide-react';

interface FooterProps {
  onScrollTo: (elementId: string) => void;
  onOpenBooking: () => void;
}

export default function Footer({ onScrollTo, onOpenBooking }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onScrollTo('hero')}>
              <div className="bg-gradient-to-tr from-primary-600 to-secondary-600 p-2 rounded-xl text-white">
                <Droplet className="h-5 w-5" />
              </div>
              <span className="font-display font-extrabold text-xl text-white tracking-tight">
                SwiftRoot <span className="text-xs font-sans font-medium uppercase text-primary-500 bg-red-500/10 px-1.5 py-0.5 rounded">Plumbing</span>
              </span>
            </div>

            <p className="text-xs font-sans text-slate-400 leading-relaxed">
              Serving citizens across Liverpool, Bootle, Crosby, Huyton, Sefton, and Wirral. Gas Safe certified emergency response fleet operating around the clock, 365 days a year.
            </p>

            {/* Simulated Live status badge */}
            <div className="inline-flex items-center space-x-2 bg-red-500/10 px-3 py-1.5 rounded-xl border border-red-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest leading-none">
                Duty Crew Dispatch Active
              </span>
            </div>
          </div>

          {/* Quick links Columns */}
          <div className="lg:col-span-2.5 space-y-4">
            <h4 className="text-xs font-mono font-extrabold uppercase tracking-widest text-slate-200">
              Navigation Menu
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <button 
                  onClick={() => onScrollTo('services')} 
                  className="hover:text-primary-400 text-slate-400 border-none bg-transparent cursor-pointer"
                >
                  Plumbing Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollTo('emergency')} 
                  className="hover:text-primary-400 text-slate-400 border-none bg-transparent cursor-pointer"
                >
                  Emergency Hub 24/7
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollTo('coverage')} 
                  className="hover:text-primary-400 text-slate-400 border-none bg-transparent cursor-pointer"
                >
                  Merseyside Coverage Map
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollTo('reviews')} 
                  className="hover:text-primary-400 text-slate-400 border-none bg-transparent cursor-pointer"
                >
                  Vetted Customer Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency support contacts */}
          <div className="lg:col-span-3 space-y-4 font-sans">
            <h4 className="text-xs font-mono font-extrabold uppercase tracking-widest text-slate-200">
              Emergency Contacts
            </h4>
            <div className="space-y-3.5 text-xs text-slate-400">
              <a 
                href="tel:01517094242" 
                className="flex items-start space-x-3 group hover:text-white transition-colors"
              >
                <PhoneCall className="h-4.5 w-4.5 text-primary-500 shrink-0 mt-0.5 group-hover:scale-105" />
                <div>
                  <p className="font-bold text-slate-350 leading-none">0151 709 4242</p>
                  <p className="text-[10px] text-slate-500 mt-1">Immediate Vehicle Dispatch Hotline</p>
                </div>
              </a>

              <a 
                href="mailto:adambinmuhammad661@gmail.com" 
                className="flex items-start space-x-3 group hover:text-white transition-colors"
                referrerPolicy="no-referrer"
              >
                <Mail className="h-4.5 w-4.5 text-secondary-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-350 leading-none break-all">adambinmuhammad661@gmail.com</p>
                  <p className="text-[10px] text-slate-500 mt-1">General Inquiries & Invoices</p>
                </div>
              </a>

              <div className="flex items-start space-x-3">
                <MapPin className="h-4.5 w-4.5 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-350 leading-none">Liverpool, United Kingdom</p>
                  <p className="text-[10px] text-slate-500 mt-1">Serving Merseyside & Environs</p>
                </div>
              </div>
            </div>
          </div>

          {/* Licenses & Industry Standard badge logos */}
          <div className="lg:col-span-2.5 space-y-4">
            <h4 className="text-xs font-mono font-extrabold uppercase tracking-widest text-slate-200">
              Audited Affiliations
            </h4>
            <div className="space-y-2.5">
              
              <div className="flex items-center space-x-2.5 p-2 rounded bg-slate-800/40 border border-slate-800/50">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span className="text-[10px] font-mono font-bold text-slate-300">GAS SAFE ID: 529321</span>
              </div>

              <div className="flex items-center space-x-2.5 p-2 rounded bg-slate-800/40 border border-slate-800/50">
                <Award className="h-4 w-4 text-secondary-500" />
                <span className="text-[10px] font-mono font-bold text-slate-300">WATERSAFE REGISTERED</span>
              </div>

              <div className="flex items-center space-x-2.5 p-2 rounded bg-slate-800/40 border border-slate-800/50">
                <Lock className="h-4 w-4 text-slate-400" />
                <span className="text-[10px] font-mono font-bold text-slate-300">FULLY INSURED • £5M PL</span>
              </div>

            </div>
          </div>

        </div>

        {/* Dynamic sub footer Copyright notices */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} SwiftRoot Plumbing Ltd. Registered in England & Wales. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0 font-medium">
            <span className="hover:text-white cursor-pointer hover:underline">Terms of Service</span>
            <span className="hover:text-white cursor-pointer hover:underline">Privacy Policy</span>
            <span className="text-slate-650">•</span>
            <span className="flex items-center space-x-1 hover:text-white cursor-pointer">
              <span>Merseyside Gas Registry</span>
              <ExternalLink className="h-3 w-3" />
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
