import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wrench, Flame, HelpCircle, Check, Coins, Calculator, TrendingUp, Sparkles, ChevronDown } from 'lucide-react';
import { Service } from '../types';

const SERVICES_DATA: Service[] = [
  {
    id: 'emer_leak',
    title: 'Burst Pipe & Flood Response',
    description: 'Rapid-onset active flooding isolation, pipe replacement, soldering, and leak trace & access.',
    basePrice: 120,
    category: 'emergency',
    iconName: 'flame',
    popular: true
  },
  {
    id: 'boiler_fix',
    title: 'Boiler Repair & Diagnostics',
    description: 'Gas Safe troubleshooting, fan replacement, pump repairs, and ignition sensor diagnostics.',
    basePrice: 90,
    category: 'repair',
    iconName: 'wrench'
  },
  {
    id: 'drain_clear',
    title: 'High-Pressure Drain Jetting',
    description: 'Sewer line clearing, kitchen fat berg removal, toilet unblocking, and CCTV survey diagnostics.',
    basePrice: 80,
    category: 'maintenance',
    iconName: 'wrench',
    popular: false
  },
  {
    id: 'tap_fittings',
    title: 'Taps, Toilets & Mixer Fit',
    description: 'Replacing kitchen taps, ceramic toilets, bathroom sinks, and thermostatic bath/shower mixers.',
    basePrice: 65,
    category: 'installation',
    iconName: 'wrench'
  },
  {
    id: 'heating_service',
    title: 'Power Flushing & Radiators',
    description: 'Removing magnetic black sludge from central heating pipelines to restore thermal radiator efficiency.',
    basePrice: 140,
    category: 'maintenance',
    iconName: 'wrench'
  },
  {
    id: 'general_leak',
    title: 'General Leak Detection',
    description: 'Trace and access for mystery mold spots, wall cavity leaks, and high water bill diagnostics.',
    basePrice: 75,
    category: 'repair',
    iconName: 'wrench'
  }
];

interface ServicesProps {
  onOpenBooking: (prefilledServiceId?: string) => void;
}

export default function Services({ onOpenBooking }: ServicesProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'emergency' | 'repair' | 'installation' | 'maintenance'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Quote Calculator states
  const [calcService, setCalcService] = useState(SERVICES_DATA[3].id);
  const [calcComplexity, setCalcComplexity] = useState<number>(1); // 1 = Standard, 1.3 = Complex, 1.6 = Conciliated
  const [calcMaterial, setCalcMaterial] = useState<number>(1); // 1 = Copper, 1.25 = Premium chrome / durable joints

  const activeCalcServiceObj = SERVICES_DATA.find(s => s.id === calcService) || SERVICES_DATA[3];
  const calculatedEstimate = Math.round(activeCalcServiceObj.basePrice * calcComplexity * calcMaterial);

  const filteredServices = SERVICES_DATA.filter(service => 
    activeCategory === 'all' || service.category === activeCategory
  );

  return (
    <section id="services" className="py-24 bg-white dark:bg-slate-950 px-4 sm:px-6 lg:px-8 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Curved visual accent decoration */}
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -ml-36"></div>

        {/* Header content block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-950/20 px-3.5 py-1.5 rounded-full border border-blue-200/45 dark:border-blue-900/30">
            <Wrench className="h-4 w-4 text-secondary-500" />
            <span className="text-xs font-bold text-secondary-600 dark:text-secondary-400 uppercase tracking-widest font-mono">
              Expert Solutions
            </span>
          </div>
          <h2 className="font-display font-black text-3.5xl sm:text-4.5xl text-slate-900 dark:text-white tracking-tight">
            Comprehensive Plumbing Services
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            From emergency repairs to standard bathroom faucet and heating updates in Liverpool. Filter below to locate your specific requirement.
          </p>
        </div>

        {/* Filters and Search grids */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {['all', 'emergency', 'repair', 'installation', 'maintenance'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat as any);
                setExpandedId(null);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/40 dark:border-slate-800'
              }`}
            >
              {cat === 'all' ? 'All Services' : cat}
            </button>
          ))}
        </div>

        {/* Main Grid for services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start mb-20">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => {
              const isExpanded = expandedId === service.id;
              return (
                <motion.div
                  layout
                  key={service.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`bg-slate-50 dark:bg-slate-900/85 rounded-3xl border select-none transition-shadow overflow-hidden group p-6 sm:p-7 relative ${
                    service.popular 
                      ? 'border-primary-500/45 dark:border-primary-500/25 shadow-xl shadow-red-500/5' 
                      : 'border-slate-200/70 dark:border-slate-800/80 hover:shadow-lg hover:shadow-slate-200/40 dark:hover:shadow-slate-950'
                  }`}
                >
                  
                  {/* Popular highlight ribbon */}
                  {service.popular && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-rose-500 text-white text-[10px] font-extrabold font-mono uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center space-x-1 shadow-sm">
                      <Sparkles className="h-3 w-3 animate-spin" />
                      <span>Most Demanded</span>
                    </div>
                  )}

                  {/* Icon and category type badge */}
                  <div className="flex items-center space-x-4 mb-5">
                    <div className={`p-3 rounded-2xl relative shrink-0 ${
                      service.category === 'emergency' 
                      ? 'bg-red-500/10 text-primary-600' 
                      : 'bg-blue-500/10 text-secondary-600'
                    }`}>
                      {service.category === 'emergency' ? (
                        <Flame className="h-6 w-6 animate-pulse" />
                      ) : (
                        <Wrench className="h-6 w-6 group-hover:rotate-15 transition-transform" />
                      )}
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-mono font-extrabold tracking-widest text-slate-400 dark:text-slate-500">
                        {service.category} Category
                      </p>
                      <h4 className="font-display font-bold text-base text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {service.title}
                      </h4>
                    </div>
                  </div>

                  {/* Body Info */}
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-normal mb-6 min-h-[48px]">
                    {service.description}
                  </p>

                  {/* Expand-Details Block */}
                  <div className="mb-6">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : service.id)}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 border-none bg-transparent cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide pricing breakdown' : 'See inclusions & breakdown'}</span>
                      <ChevronDown className={`h-3 w-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-3.5 space-y-2 border-t border-dashed border-slate-200 dark:border-slate-800/80 mt-3 text-xs"
                        >
                          <div className="flex items-center space-x-2">
                            <Check className="h-3.5 w-3.5 text-emerald-500" />
                            <span className="text-slate-650 dark:text-slate-300">Gas-Safe Registered diagnostic check</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Check className="h-3.5 w-3.5 text-emerald-500" />
                            <span className="text-slate-650 dark:text-slate-300">Up to 12-month quality guarantee</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Check className="h-3.5 w-3.5 text-emerald-500" />
                            <span className="text-slate-650 dark:text-slate-300">Materials and parts sourcing options</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Pricing footer block wrapper */}
                  <div className="pt-4 border-t border-slate-250/20 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-mono tracking-widest leading-none">
                        Guaranteed Estimate From
                      </p>
                      <h4 className="font-display font-black text-2xl text-slate-900 dark:text-white mt-1">
                        £{service.basePrice} <span className="text-xs font-medium text-slate-500 font-sans">ex. VAT</span>
                      </h4>
                    </div>

                    <button
                      onClick={() => onOpenBooking(service.id)}
                      className="px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl text-xs font-bold shadow-md hover:from-primary-700 hover:to-secondary-700 hover:shadow-md transition-all cursor-pointer"
                    >
                      Book Details
                    </button>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Live Estimation Slider Calculator element */}
        <div className="bg-gradient-to-br from-slate-100 to-sky-100/30 dark:from-slate-900/40 dark:to-slate-950 border border-slate-200/55 dark:border-slate-800/80 rounded-[2rem] p-6 sm:p-10 shadow-sm relative">
          
          <div className="absolute top-4 right-4 text-[10px] font-mono font-bold bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 border border-secondary-500/20 rounded-md px-2 py-0.5 max-w-fit flex items-center space-x-1 select-none">
            <Coins className="h-3.5 w-3.5" />
            <span>Interactive Cost Calculator</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Calculator Inputs Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white flex items-center space-x-2.5">
                  <Calculator className="h-5 w-5 text-secondary-500" />
                  <span>Interactive Estimation Slider</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md">
                  Tweak parameters based on your job requirements to get a transparent and honest visual price guide immediately.
                </p>
              </div>

              {/* Service list drop option */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Choose Target Plumbing Job:
                </label>
                <select
                  value={calcService}
                  onChange={(e) => setCalcService(e.target.value)}
                  className="w-full text-xs rounded-xl px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:text-white focus:outline-hidden transition-all font-sans font-bold"
                >
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title} (Base: £{s.basePrice})
                    </option>
                  ))}
                </select>
              </div>

              {/* Job Complexity slider range selectors */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-500 dark:text-slate-400">Accessibility / Complexity:</span>
                  <span className="font-mono font-extrabold text-secondary-600 dark:text-secondary-400 bg-secondary-500/10 px-2 py-0.5 rounded">
                    {calcComplexity === 1 ? 'Easily Accessible (1.0x)' : calcComplexity === 1.3 ? 'Medium Complexity (1.3x)' : 'Concealed cavity/concealed (1.6x)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="1"
                  value={calcComplexity === 1 ? 1 : calcComplexity === 1.3 ? 2 : 3}
                  onChange={(e) => {
                    const mappedVal = e.target.value === '1' ? 1 : e.target.value === '2' ? 1.3 : 1.6;
                    setCalcComplexity(mappedVal);
                  }}
                  className="w-full cursor-pointer accent-secondary-500 h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-bold font-mono px-1">
                  <span>STANDARD (E.G. EXPOSED TAP)</span>
                  <span>MEDIUM BLOCKAGE/SERVICING</span>
                  <span>CONCEALED WALL CAVITY</span>
                </div>
              </div>

              {/* Quality level selections */}
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Type of Pipework / Joinery Materials:
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setCalcMaterial(1)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                      calcMaterial === 1
                        ? 'bg-secondary-500 text-white border-secondary-600'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    Standard Copper / Fitting (1.0x)
                  </button>
                  <button
                    onClick={() => setCalcMaterial(1.25)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                      calcMaterial === 1.25
                        ? 'bg-secondary-500 text-white border-secondary-600'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    Heavy-Duty Anti-Corrosive (1.25x)
                  </button>
                </div>
              </div>

            </div>

            {/* Display Quote Output Column */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 p-6 sm:p-8 rounded-2xl flex flex-col justify-between items-center text-center shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500"></div>

              <div className="space-y-1 mt-2">
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-slate-400">
                  Estimated Pricing Range
                </span>
                <h4 className="font-display font-black text-4xl sm:text-5xl text-slate-950 dark:text-white tracking-tight">
                  £{calculatedEstimate - 10} - £{calculatedEstimate + 15}
                </h4>
                <p className="text-[10px] text-slate-400 font-mono font-bold">
                  Includes full diagnostic check &bull; ex. VAT & parts
                </p>
              </div>

              <div className="py-4 my-3 w-full border-y border-dashed border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400 space-y-1.5 text-left pl-2">
                <p className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>95% Pricing estimation accuracy in Liverpool</span>
                </p>
                <p className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Gas-Safe certification of completions</span>
                </p>
              </div>

              <button
                onClick={() => onOpenBooking(calcService)}
                className="w-full bg-secondary-600 hover:bg-secondary-700 text-white font-bold text-sm py-3 px-6 rounded-xl shadow-md transition-all cursor-pointer"
              >
                Book This Calculated Estimate
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
