import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Clock, ShieldCheck, Compass, Radio, Users, Check, Phone } from 'lucide-react';

interface Zone {
  id: string;
  name: string;
  coverage: string;
  engineersCount: number;
  avgEta: number;
  activePlumbers: string[];
  description: string;
  postcodes: string;
  status: 'optimal' | 'busy' | 'flooded';
}

const LIVERPOOL_ZONES: Zone[] = [
  {
    id: 'central',
    name: 'Central Cluster',
    coverage: 'Liverpool City Centre, Anfield, Everton, Vauxhall',
    engineersCount: 5,
    avgEta: 15,
    activePlumbers: ['Marcus Evans (Gas Safe Id 5192)', 'Liam Hughes (Team Lead)'],
    description: 'Our highest-density rapid dispatch depot. Engineers are stationed near the Royal Liverpool Hospital and Lime Street for instant deployment.',
    postcodes: 'L1, L2, L3, L4, L5, L6',
    status: 'optimal'
  },
  {
    id: 'south',
    name: 'South Merseyside Zone',
    coverage: 'Toxteth, Garston, Speke, Woolton, Aigburth',
    engineersCount: 4,
    avgEta: 18,
    activePlumbers: ['Dave Mitchell (Senior Fitter)', 'Paul Harrison (Gas Safe Id 6023)'],
    description: 'Serving residential districts and industrial spots in South Liverpool, including Speke Airport boundaries. Steady fleet coverage.',
    postcodes: 'L8, L15, L17, L18, L19, L24, L25',
    status: 'optimal'
  },
  {
    id: 'north',
    name: 'North Sefton Environs',
    coverage: 'Crosby, Waterloo, Bootle, Seaforth',
    engineersCount: 3,
    avgEta: 22,
    activePlumbers: ['Ian Gallagher (Drain Specialist)'],
    description: 'Serving waterworks, seafront leaks, domestic blockages, and commercial kitchen drains across Crosby and Bootle docks.',
    postcodes: 'L20, L21, L22, L23',
    status: 'optimal'
  },
  {
    id: 'east',
    name: 'East Hub',
    coverage: 'West Derby, Old Swan, Huyton, Tuebrook',
    engineersCount: 3,
    avgEta: 20,
    activePlumbers: ['Stuart Broad (Thermal/Radiators)'],
    description: 'Serving residential central heating power-flushes and plumbing leaks near West Derby and Knowsley boundaries.',
    postcodes: 'L12, L13, L14, L36',
    status: 'optimal'
  },
  {
    id: 'wirral',
    name: 'Wirral Depot (Mersey Crossing)',
    coverage: 'Birkenhead, Wallasey, Liscard',
    engineersCount: 2,
    avgEta: 26,
    activePlumbers: ['Alan Shearer (Senior Emergency Plumber)'],
    description: 'Operating vehicles directly across the Kingsway & Queensway tunnels for instant Wirral assignments. No tunnel transit surcharges.',
    postcodes: 'CH41, CH42, CH43, CH44',
    status: 'busy'
  }
];

export default function MapArea() {
  const [selectedZoneId, setSelectedZoneId] = useState('central');

  const activeZone = LIVERPOOL_ZONES.find(z => z.id === selectedZoneId) || LIVERPOOL_ZONES[0];

  return (
    <section id="coverage" className="py-24 bg-white dark:bg-slate-950 px-4 sm:px-6 lg:px-8 relative scroll-mt-20 overflow-hidden">
      
      {/* Curved background decoration */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none -mr-40"></div>

      <div className="max-w-7xl mx-auto">
        
        {/* Header Title Grid */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-100 to-blue-100 dark:from-red-950/20 dark:to-blue-950/20 border border-slate-200 dark:border-slate-800 px-3.5 py-1.5 rounded-full select-none">
            <Compass className="h-4.5 w-4.5 text-secondary-500" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest font-mono">
              Live Fleet Geo-Monitor
            </span>
          </div>
          <h2 className="font-display font-black text-3.5xl sm:text-4.5xl text-slate-900 dark:text-white tracking-tight">
            Liverpool Coverage & Duty Desk
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We operate fully stocked plumbing units covering all Liverpool postcodes. Select a Merseyside sector on our interactive geo-grid to trace on-call vans.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Custom vector-stylized Map selector panel */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/80 rounded-[2.5rem] p-6 sm:p-8 flex flex-col justify-between items-center relative overflow-hidden min-h-[420px] shadow-sm select-none">
            
            {/* Blinking Radar Grid Overlays */}
            <div className="absolute top-4 left-4 flex items-center space-x-2 bg-white dark:bg-slate-950 px-3 py-1.5 rounded-full border border-slate-200/60 dark:border-slate-800/80 text-[10px] font-mono font-black text-slate-700 dark:text-slate-300">
              <Radio className="h-4.5 w-4.5 text-emerald-500 animate-pulse" />
              <span>REAL-TIME FLEET TELEMETRY GPS</span>
            </div>

            {/* Custom Interactive Map Graphics Grid */}
            <div className="w-full flex-1 flex items-center justify-center relative py-6">
              
              {/* Complex Responsive Blueprint Matrix representing Liverpool geographic alignment */}
              <div className="grid grid-cols-3 grid-rows-3 gap-3 w-full max-w-md aspect-square relative z-10 text-center font-display">
                
                {/* Empty spacer */}
                <div></div>

                {/* NORTH: Sefton Crosby */}
                <motion.div
                  className={`p-4 rounded-3xl border flex flex-col items-center justify-center cursor-pointer relative shadow-sm transition-all ${
                    selectedZoneId === 'north'
                      ? 'bg-gradient-to-tr from-secondary-600 to-blue-500 text-white border-secondary-400 ring-2 ring-blue-500/25'
                      : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                  onClick={() => setSelectedZoneId('north')}
                  whileHover={{ y: -3 }}
                >
                  <MapPin className={`h-5 w-5 mb-1 ${selectedZoneId === 'north' ? 'text-white' : 'text-secondary-500'}`} />
                  <span className="text-xs font-extrabold">North Region</span>
                  <span className="text-[9px] font-mono opacity-80 mt-1">Crosby / Bootle</span>
                  {/* Blinking pin dot */}
                  <span className="absolute top-2 right-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </motion.div>

                {/* Empty space */}
                <div></div>

                {/* WEST: Wirral Across Mersey */}
                <motion.div
                  className={`p-4 rounded-3xl border flex flex-col items-center justify-center cursor-pointer relative shadow-sm transition-all ${
                    selectedZoneId === 'wirral'
                      ? 'bg-gradient-to-tr from-secondary-600 to-blue-500 text-white border-secondary-400 ring-2 ring-blue-500/25'
                      : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                  onClick={() => setSelectedZoneId('wirral')}
                  whileHover={{ y: -3 }}
                >
                  <MapPin className={`h-5 w-5 mb-1 ${selectedZoneId === 'wirral' ? 'text-white' : 'text-primary-500'}`} />
                  <span className="text-xs font-extrabold">Wirral</span>
                  <span className="text-[9px] font-mono opacity-80 mt-1">Birkenhead</span>
                  <span className="absolute top-2 right-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                </motion.div>

                {/* CENTRAL: City Centre & Anfield */}
                <motion.div
                  className={`p-4 rounded-3xl border flex flex-col items-center justify-center cursor-pointer relative shadow-sm transition-all ${
                    selectedZoneId === 'central'
                      ? 'bg-gradient-to-tr from-primary-600 to-red-500 text-white border-red-400 ring-2 ring-red-500/25'
                      : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                  onClick={() => setSelectedZoneId('central')}
                  whileHover={{ scale: 1.02 }}
                >
                  <MapPin className={`h-5 w-5 mb-1 ${selectedZoneId === 'central' ? 'text-white animate-bounce' : 'text-primary-650'}`} />
                  <span className="text-xs font-black">Central Cluster</span>
                  <span className="text-[9px] font-mono opacity-80 mt-1">L1 - L6 Postcode</span>
                  <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                </motion.div>

                {/* EAST: West Derby */}
                <motion.div
                  className={`p-4 rounded-3xl border flex flex-col items-center justify-center cursor-pointer relative shadow-sm transition-all ${
                    selectedZoneId === 'east'
                      ? 'bg-gradient-to-tr from-secondary-600 to-blue-500 text-white border-secondary-400 ring-2 ring-blue-500/25'
                      : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                  onClick={() => setSelectedZoneId('east')}
                  whileHover={{ y: -3 }}
                >
                  <MapPin className={`h-5 w-5 mb-1 ${selectedZoneId === 'east' ? 'text-white' : 'text-secondary-500'}`} />
                  <span className="text-xs font-extrabold">East Zone</span>
                  <span className="text-[9px] font-mono opacity-80 mt-1">West Derby</span>
                  <span className="absolute top-2 right-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </motion.div>

                {/* Spacer */}
                <div></div>

                {/* SOUTH: Toxteth Speke Garston */}
                <motion.div
                  className={`p-4 rounded-3xl border flex flex-col items-center justify-center cursor-pointer relative shadow-sm transition-all ${
                    selectedZoneId === 'south'
                      ? 'bg-gradient-to-tr from-secondary-600 to-blue-500 text-white border-secondary-400 ring-2 ring-blue-500/25'
                      : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                  onClick={() => setSelectedZoneId('south')}
                  whileHover={{ y: -3 }}
                >
                  <MapPin className={`h-5 w-5 mb-1 ${selectedZoneId === 'south' ? 'text-white' : 'text-primary-500'}`} />
                  <span className="text-xs font-extrabold">South Zone</span>
                  <span className="text-[9px] font-mono opacity-80 mt-1">Speke / Garston</span>
                  <span className="absolute top-2 right-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </motion.div>

                {/* Spacer */}
                <div></div>

              </div>

              {/* Decorative river background line mimicking River Mersey */}
              <div className="absolute top-0 bottom-0 left-[26%] w-1.5 bg-gradient-to-b from-blue-300 border-r border-blue-400/20 dark:from-slate-800 dark:to-slate-800/20 pointer-events-none transform -skew-x-12 z-0 hidden sm:block">
                <span className="absolute top-[45%] -left-12 rotate-270 text-[8px] font-bold font-mono text-blue-400 mix-blend-color-dodge uppercase tracking-wider">
                  The River Mersey
                </span>
              </div>

            </div>

            {/* Quick help guides */}
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-4 text-center">
              💡 Map is structured geometrically relative to postcodes. Switch sectors to update telemetry details on the right panel.
            </p>

          </div>

          {/* Interactive Geo telemetries summary panel */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeZone.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="bg-white dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/80 rounded-[2.5rem] p-6 sm:p-8 shadow-lg flex-1 flex flex-col justify-between"
              >
                
                {/* Sector Header */}
                <div className="pb-4 border-b border-slate-100 dark:border-slate-850 flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">
                      {activeZone.name}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">
                      Merseyside Coverage Sector
                    </p>
                  </div>

                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                    activeZone.status === 'optimal' 
                      ? 'bg-emerald-500/10 text-emerald-650 dark:text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-655 dark:text-amber-400 border border-amber-500/20'
                  }`}>
                    {activeZone.status === 'optimal' ? '● Fleet Optimal' : '● Heavy Loads'}
                  </span>
                </div>

                {/* Body Sector statistics info */}
                <div className="py-6 space-y-6 flex-1">
                  
                  {/* Detailed Description */}
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Depot Alignment Overview</p>
                    <p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed font-sans">
                      {activeZone.description}
                    </p>
                  </div>

                  {/* Postcodes covered list */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-500 dark:text-slate-400">Aggregated Postcodes:</span>
                    <span className="font-mono font-extrabold text-slate-800 dark:text-white bg-slate-200/55 dark:bg-slate-800 px-2 py-0.5 rounded">
                      {activeZone.postcodes}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Active Specialists */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center space-x-2 text-secondary-500 font-bold text-xs">
                        <Users className="h-4.5 w-4.5" />
                        <span>Vans Stationary</span>
                      </div>
                      <h4 className="font-display font-black text-2xl text-slate-900 dark:text-white mt-1.5">
                        {activeZone.engineersCount}
                      </h4>
                    </div>

                    {/* Duty Dispatch Wait */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center space-x-2 text-primary-500 font-bold text-xs">
                        <Clock className="h-4.5 w-4.5" />
                        <span>Avg ETA Waiting</span>
                      </div>
                      <h4 className="font-display font-black text-2xl text-slate-900 dark:text-white mt-1.5">
                        {activeZone.avgEta} Mins
                      </h4>
                    </div>
                  </div>

                  {/* On Duty plumbers listed names */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Engineers Stationed in Sector</p>
                    <div className="space-y-1.5">
                      {activeZone.activePlumbers.map((plumber, idx) => (
                        <div key={idx} className="flex items-center space-x-2.5 text-xs text-slate-700 dark:text-slate-300">
                          <Check className="h-4 w-4 text-emerald-500" />
                          <span className="font-medium">{plumber}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Booking call CTAs inside sector details card */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between gap-4">
                  <div className="hidden sm:block">
                    <p className="text-[10px] text-slate-400 uppercase font-mono tracking-widest leading-none">Dispatcher hotline</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-white mt-1">0151 709 4242</p>
                  </div>
                  
                  <a 
                    href="tel:01517094242"
                    className="flex-1 sm:flex-none text-center bg-gradient-to-r from-primary-600 to-red-500 hover:from-primary-700 hover:to-red-600 text-white font-bold text-xs py-3 px-6 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Dispatch to Sector</span>
                  </a>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
