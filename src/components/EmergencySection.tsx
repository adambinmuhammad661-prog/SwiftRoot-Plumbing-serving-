import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertOctagon, PhoneCall, HelpCircle, CheckCircle2, User, Loader2, MapPin, ShieldAlert, ArrowRight, CornerDownRight } from 'lucide-react';
import { EmergencyTicket } from '../types';

const LIVERPOOL_AREAS = [
  { name: 'City Centre (L1, L2, L3)', eta: 15 },
  { name: 'Anfield & Everton (L4, L5)', eta: 18 },
  { name: 'Toxteth & Edge Hill (L8, L7)', eta: 16 },
  { name: 'West Derby & Old Swan (L12, L13)', eta: 20 },
  { name: 'Mossley Hill & Woolton (L18, L25)', eta: 22 },
  { name: 'Speke & Garston (L19, L24)', eta: 25 },
  { name: 'Crosby & Waterloo (L22, L23)', eta: 24 },
  { name: 'Birkenhead & Wallasey (CH)', eta: 28 },
];

const ISSUES = [
  { id: 'burst_pipe', title: 'Burst Water Pipe (Active flooding)', severity: 'critical', priceRange: '£120 - £220', advice: 'Locate and turn off your main stopcock immediately. Usually under the kitchen sink.' },
  { id: 'boiler_leak', title: 'Boiler Leak / Heating Malfunction', severity: 'severe', priceRange: '£90 - £180', advice: 'Switch off the boiler mains power electrical switch and isolate the water valve if possible.' },
  { id: 'drain_block', title: 'Blocked Sewer or Sewage Backflow', severity: 'severe', priceRange: '£80 - £150', advice: 'Do not flush any toilet or run taps in the property. Keep children and pets clear.' },
  { id: 'no_hot_water', title: 'No Hot Water (Vulnerable household)', severity: 'high', priceRange: '£70 - £140', advice: 'Check if you have power or pressure errors. Do not tamper with gas pipelines.' },
  { id: 'gas_leak', title: 'Suspected Gas Pipe / Boiler Scent', severity: 'critical', priceRange: '£110 - £200', advice: 'Open all windows immediately. Do not flip electrical switches or use lighters. Evacuate property!' },
];

export default function EmergencySection() {
  const [selectedIssue, setSelectedIssue] = useState(ISSUES[0].id);
  const [selectedArea, setSelectedArea] = useState(LIVERPOOL_AREAS[0].name);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [statusStep, setStatusStep] = useState<number>(0); // 0 = Idle, 1 = Submitting, 2 = Assigned En Route
  const [ticket, setTicket] = useState<EmergencyTicket | null>(null);

  const activeIssueObj = ISSUES.find(i => i.id === selectedIssue) || ISSUES[0];
  const activeAreaObj = LIVERPOOL_AREAS.find(a => a.name === selectedArea) || LIVERPOOL_AREAS[0];

  const handleDispatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !name) return;

    setStatusStep(1);

    // Simulate dispatch pipeline progression
    setTimeout(() => {
      setStatusStep(2);
      const ticketId = 'SW-' + Math.floor(1000 + Math.random() * 9000);
      const engineers = ['Dave Mitchell', 'Ian Gallagher', 'Liam Hughes', 'Paul Harrison', 'Marcus Evans'];
      const randomEngineer = engineers[Math.floor(Math.random() * engineers.length)];
      
      setTicket({
        id: ticketId,
        issue: activeIssueObj.title,
        urgency: activeIssueObj.severity as any,
        area: activeAreaObj.name,
        phone: phone,
        status: 'en_route',
        eta: activeAreaObj.eta,
        engineerName: randomEngineer,
        estimatedCost: activeIssueObj.priceRange
      });
    }, 2500);
  };

  const handleCancel = () => {
    setStatusStep(0);
    setTicket(null);
    setPhone('');
    setName('');
    setNote('');
  };

  return (
    <section id="emergency" className="py-20 bg-slate-100 dark:bg-slate-900 px-4 sm:px-6 lg:px-8 border-y border-slate-200/50 dark:border-slate-800/60 relative scroll-mt-20">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-red-100/50 dark:bg-red-950/20 px-3.5 py-1.5 rounded-full border border-red-300/40 dark:border-red-900/40">
            <AlertOctagon className="h-4.5 w-4.5 text-primary-500 animate-pulse" />
            <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest font-mono">
              Rapid Response Unit
            </span>
          </div>
          <h2 className="font-display font-black text-3.5xl sm:text-4.5xl text-slate-950 dark:text-white tracking-tight">
            Liverpool 24/7 Emergency Hub
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Plumbing emergency active? Use our smart dispatch desk below to estimate pricing, look up local response times, and register an emergency engineer.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Dispatcher UI Panel */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="bg-white dark:bg-slate-950 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-slate-950 border border-slate-200/50 dark:border-slate-800/80 flex-1 flex flex-col justify-between">
              
              <AnimatePresence mode="wait">
                
                {/* Step 0: Input Request form */}
                {statusStep === 0 && (
                  <motion.form 
                    key="form"
                    onSubmit={handleDispatchSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/50">
                      <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white">
                        🚨 Quick Dispatch Desk
                      </h3>
                      <span className="text-xs font-mono font-bold text-primary-500 bg-red-500/10 px-2.5 py-1 rounded-md">
                        NO CALL-OUT CHARGE
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Name Entry */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400" htmlFor="name">
                          Your Full Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="William Nelson"
                          className="w-full text-sm rounded-xl px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:text-white focus:outline-hidden focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-sans"
                        />
                      </div>

                      {/* Phone Entry */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400" htmlFor="phone">
                          Mobile Call Number
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g., 07123 456789"
                          className="w-full text-sm rounded-xl px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:text-white focus:outline-hidden focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-sans"
                        />
                      </div>
                    </div>

                    {/* Issue Option box */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        Describe Your Main Leak / Emergency Issue
                      </label>
                      <div className="grid grid-cols-1 gap-2">
                        {ISSUES.map((issue) => (
                          <div
                            key={issue.id}
                            onClick={() => setSelectedIssue(issue.id)}
                            className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                              selectedIssue === issue.id
                                ? 'bg-primary-50/50 dark:bg-red-950/20 border-red-500 ring-1 ring-red-500/20'
                                : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            <span className="flex items-center space-x-3">
                              <span className={`w-2.5 h-2.5 rounded-full ${issue.severity === 'critical' ? 'bg-red-500' : 'bg-rose-400 animate-pulse'}`}></span>
                              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{issue.title}</span>
                            </span>
                            <span className="text-[11px] font-mono font-extrabold text-slate-500 dark:text-slate-400 bg-slate-200/50 dark:bg-slate-800 px-2 py-0.5 rounded">
                              Est: {issue.priceRange}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Area selectors */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        Select Your Liverpool Location Coverage
                      </label>
                      <select
                        value={selectedArea}
                        onChange={(e) => setSelectedArea(e.target.value)}
                        className="w-full text-sm rounded-xl px-4 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:text-white focus:outline-hidden focus:border-red-500 transition-all font-sans"
                      >
                        {LIVERPOOL_AREAS.map((area) => (
                          <option key={area.name} value={area.name}>
                            {area.name} (Estimated response: {area.eta} minutes)
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Additional Notes optional text field */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400" htmlFor="note">
                        Additional Notes (Door codes, details of damage, etc.)
                      </label>
                      <textarea
                        id="note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows={2}
                        placeholder="My water valve is under my sink but it's completely stuck..."
                        className="w-full text-sm rounded-xl px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:text-white focus:outline-hidden focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-sans resize-none"
                      />
                    </div>

                    {/* Submit Dispatch */}
                    <motion.button
                      type="submit"
                      className="w-full bg-gradient-to-r from-red-600 to-rose-500 text-white font-bold text-base py-4 rounded-xl shadow-lg shadow-red-500/15 hover:shadow-red-500/25 flex items-center justify-center space-x-2.5 hover:from-red-700 hover:to-rose-600 active:scale-99 transition-all"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <PhoneCall className="h-5 w-5 animate-bounce" />
                      <span>Instantly Dispatch Emergency Engineer</span>
                    </motion.button>
                  </motion.form>
                )}

                {/* Step 1: Submitting loader */}
                {statusStep === 1 && (
                  <motion.div 
                    key="dispatching"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    className="py-16 text-center space-y-6 flex flex-col items-center justify-center h-full"
                  >
                    <div className="relative">
                      <div className="absolute top-0 left-0 w-24 h-24 bg-red-500/10 rounded-full animate-ping"></div>
                      <div className="relative bg-gradient-to-tr from-red-500 to-rose-600 text-white p-6 rounded-full shadow-lg">
                        <Loader2 className="h-10 w-10 animate-spin" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">
                        Routing Emergency Dispatch...
                      </h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                        Locating nearest mobile fleet engineer near <span className="font-bold text-slate-700 dark:text-slate-300">{selectedArea}</span>. Acquiring GPS coordinates...
                      </p>
                    </div>

                    <div className="w-full max-w-sm bg-slate-100 dark:bg-slate-900 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        className="bg-primary-500 h-full rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2.2, ease: 'easeInOut' }}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Emergency dispatcher en route */}
                {statusStep === 2 && ticket && (
                  <motion.div 
                    key="assigned"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-rose-100 dark:border-rose-950/20">
                      <div>
                        <span className="text-[10px] font-bold font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-950/20 px-2 py-0.5 rounded">
                          TICKET: {ticket.id}
                        </span>
                        <h4 className="font-display font-extrabold text-lg text-slate-900 dark:text-white mt-1">
                          Engineer Assigned & En Route!
                        </h4>
                      </div>
                      <span className="text-[10px] bg-red-600 text-white font-extrabold p-1.5 rounded-md animate-pulse">
                        LIVE TRACKING ACTIVE
                      </span>
                    </div>

                    {/* Assigned Engineer profile card */}
                    <div className="p-4 rounded-2xl bg-gradient-to-tr from-slate-50 to-blue-50/20 dark:from-slate-900 dark:to-slate-950 border border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-14 w-14 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0 font-display font-extrabold border-2 border-primary-500">
                          <User className="h-6 w-6 text-primary-600" />
                        </div>
                        <div className="text-center sm:text-left">
                          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold font-mono">
                            Assigned Gas Safe Engineer
                          </p>
                          <h4 className="font-display font-extrabold text-base text-slate-800 dark:text-white">
                            {ticket.engineerName}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            SwiftRoot Team #4 • ID #GSR-72911
                          </p>
                        </div>
                      </div>

                      <div className="text-center sm:text-right bg-white dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          Estimated Time of Arrival
                        </p>
                        <h3 className="font-display font-extrabold text-xl text-primary-600 dark:text-primary-400">
                          ~{ticket.eta} Minutes
                        </h3>
                      </div>
                    </div>

                    {/* Progress timeline */}
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        Dispatch Stage Progress
                      </p>
                      <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono font-medium">
                        <div className="p-2 rounded-lg bg-emerald-500 text-white font-bold">
                          Received
                        </div>
                        <div className="p-2 rounded-lg bg-emerald-500 text-white font-bold">
                          Assigned
                        </div>
                        <div className="p-2 rounded-lg bg-red-500 text-white animate-pulse font-bold">
                          En Route
                        </div>
                        <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-400 border border-slate-200 dark:border-slate-800">
                          Resolved
                        </div>
                      </div>
                    </div>

                    {/* Critical safety instructions */}
                    <div className="p-4 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-300/30 dark:border-red-900/30">
                      <h4 className="flex items-center text-xs font-bold text-red-700 dark:text-red-400 space-x-2">
                        <ShieldAlert className="h-4 w-4 text-red-500 shrink-0" />
                        <span>IMMEDIATE CRITICAL ADVICE (READ NOW):</span>
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2 pl-6 relative">
                        <CornerDownRight className="h-4 w-4 text-primary-600 absolute left-0 top-0.5" />
                        {activeIssueObj.advice}
                      </p>
                    </div>

                    {/* Footer tickets options */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                      <div>
                        <p className="text-slate-500 dark:text-slate-400">
                          Need to cancel or update ticket details?
                        </p>
                        <p className="font-bold text-slate-800 dark:text-slate-300">
                          Call Office Hotline: 
                          <span className="text-secondary-600 cursor-pointer hover:underline ml-1">0151 709 LOCAL</span>
                        </p>
                      </div>
                      <button
                        onClick={handleCancel}
                        className="w-full sm:w-auto text-center px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-150 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400 font-bold transition-all"
                      >
                        File Another Request
                      </button>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

            </div>
          </div>

          {/* Quick diagnostic help tool & customer reviews */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Realtime Call Info card */}
            <motion.div 
              className="bg-gradient-to-br from-primary-600 via-rose-500 to-secondary-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl hover:shadow-red-500/10 transition-all flex flex-col justify-between"
              whileHover={{ y: -3 }}
            >
              <div className="space-y-4">
                <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase mb-1 inline-block">
                  Direct Line Hotline
                </span>
                <h3 className="font-display font-extrabold text-2xl leading-snug">
                  Prefer a direct dial in Liverpool?
                </h3>
                <p className="text-sm text-red-50/90 leading-relaxed">
                  Skip the system and call our immediate office dispatcher directly for instant vehicle allocations.
                </p>
              </div>

              <div className="mt-8">
                <p className="text-xs text-red-100 font-semibold mb-1">Local Liverpool Rate Line</p>
                <div className="flex flex-wrap items-center gap-3">
                  <a 
                    href="tel:01517094242" 
                    className="inline-flex items-center space-x-2.5 bg-white text-primary-600 hover:bg-red-50 px-5 py-3 rounded-2xl font-display font-black text-lg shadow-md transition-all shrink-0"
                  >
                    <PhoneCall className="h-5 w-5 animate-pulse" />
                    <span>0151 709 4242</span>
                  </a>
                  <p className="text-[11px] text-red-100 font-mono font-bold leading-normal">
                    • Average pick-up: &lt; 9s<br />
                    • Open 24/7/365
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Diagnostic advice box */}
            <div className="bg-white dark:bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-200/50 dark:border-slate-800/80 shadow-md">
              <h4 className="font-display font-extrabold text-sm text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center space-x-2">
                <HelpCircle className="h-5 w-5 text-secondary-500" />
                <span>Frequently Asked: Stopcocks</span>
              </h4>
              <div className="pt-4 space-y-4 text-xs">
                <div className="space-y-1">
                  <h5 className="font-bold text-slate-800 dark:text-slate-200">
                    What is an internal stopcock?
                  </h5>
                  <p className="text-slate-650 dark:text-slate-400 leading-normal">
                    This is your property's main water valve switch. Twisting it clockwise completely turns off all incoming cold water, minimizing active damage from leaking pipe bursts.
                  </p>
                </div>

                <div className="space-y-1">
                  <h5 className="font-bold text-slate-800 dark:text-slate-200">
                    Where is it typically located?
                  </h5>
                  <p className="text-slate-650 dark:text-slate-400 leading-normal">
                    Check below the kitchen sink cupboard, under the ground floor stairs, in an adjacent hall passageway, or occasionally inside a utility / garage closet.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
