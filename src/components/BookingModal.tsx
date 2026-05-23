import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Mail, Phone, MapPin, Sparkles, CheckCircle2, AlertTriangle, ChevronRight } from 'lucide-react';
import { Booking } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledServiceId: string | null;
}

const SERVICES_OPTIONS = [
  { id: 'emer_leak', title: 'Burst Pipe & Flood Response', price: 120 },
  { id: 'boiler_fix', title: 'Boiler Repair & Diagnostics', price: 90 },
  { id: 'drain_clear', title: 'High-Pressure Drain Jetting', price: 80 },
  { id: 'tap_fittings', title: 'Taps, Toilets & Mixer Fit', price: 65 },
  { id: 'heating_service', title: 'Power Flushing & Radiators', price: 140 },
  { id: 'general_leak', title: 'General Leak Detection', price: 75 },
];

const TIME_SLOTS = [
  { value: 'morning', label: 'Morning Slot (8:00 AM - 12:00 PM)' },
  { value: 'afternoon', label: 'Afternoon Slot (12:00 PM - 4:00 PM)' },
  { value: 'evening', label: 'Evening Slot (4:00 PM - 8:00 PM)' },
  { value: 'night', label: 'Night Shift / Emergency (8:00 PM - 8:00 AM)' }
];

export default function BookingModal({ isOpen, onClose, prefilledServiceId }: BookingModalProps) {
  const [step, setStep] = useState<number>(1); // 1 = Entry Form, 2 = Submitting Loader, 3 = Confirmation receipt
  
  // States
  const [selectedServiceId, setSelectedServiceId] = useState(SERVICES_OPTIONS[3].id);
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [postcode, setPostcode] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0].value);
  const [notes, setNotes] = useState('');
  const [urgent, setUrgent] = useState(false);

  const [bookingTicket, setBookingTicket] = useState<Booking | null>(null);

  // Set preset inputs when modal opens
  useEffect(() => {
    if (prefilledServiceId) {
      setSelectedServiceId(prefilledServiceId);
      const isEmergencyCat = prefilledServiceId === 'emer_leak';
      setUrgent(isEmergencyCat);
    }
    setStep(1);
  }, [prefilledServiceId, isOpen]);

  if (!isOpen) return null;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !email || !phone || !postcode || !date) return;

    setStep(2);

    // Simulated network transit latency
    setTimeout(() => {
      const confirmationTicketId = 'SRB-' + Math.floor(10000 + Math.random() * 90000);
      setBookingTicket({
        id: confirmationTicketId,
        serviceId: selectedServiceId,
        customerName: customerName,
        email: email,
        phone: phone,
        postcode: postcode,
        date: date,
        timeSlot: TIME_SLOTS.find(ts => ts.value === timeSlot)?.label || timeSlot,
        notes: notes,
        urgent: urgent,
        status: 'confirmed'
      });
      setStep(3);
    }, 2000);
  };

  const handleReset = () => {
    setCustomerName('');
    setEmail('');
    setPhone('');
    setPostcode('');
    setDate('');
    setNotes('');
    setUrgent(false);
    onClose();
  };

  const activeServiceObj = SERVICES_OPTIONS.find(s => s.id === selectedServiceId) || SERVICES_OPTIONS[3];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        
        {/* Backdrop modal overlay */}
        <motion.div 
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        ></motion.div>

        {/* Action Panel */}
        <motion.div 
          className="bg-white dark:bg-slate-950 rounded-3xl w-full max-w-lg border border-slate-200 dark:border-slate-800 shadow-2xl relative z-10 overflow-hidden font-sans select-none"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', duration: 0.5 }}
        >
          {/* Top header border lines */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-600 via-rose-500 to-secondary-600"></div>

          {/* Close trigger button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 border-none bg-transparent cursor-pointer text-slate-450 dark:text-slate-500 hover:text-slate-705 dark:hover:text-slate-300 transition-colors"
            aria-label="Close Booking Panel"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              
              {/* Step 1: Input details */}
              {step === 1 && (
                <motion.div
                  key="form-entry"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="pb-5 border-b border-slate-100 dark:border-slate-850 mb-6">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-secondary-500 flex items-center space-x-1.5">
                      <Sparkles className="h-4 w-4 animate-spin mb-0.5" />
                      <span>Online Booking Panel</span>
                    </span>
                    <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white mt-1">
                      Schedule a Repair & Service
                    </h3>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    
                    {/* Select Job Type */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Target Plumbing Service</label>
                      <select
                        value={selectedServiceId}
                        onChange={(e) => setSelectedServiceId(e.target.value)}
                        className="w-full text-xs rounded-xl px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:text-white font-bold"
                      >
                        {SERVICES_OPTIONS.map(s => (
                          <option key={s.id} value={s.id}>
                            {s.title} (From: £{s.price})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name Entry */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Your Fulle Name</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                          <input
                            type="text"
                            required
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            placeholder="John Smith"
                            className="w-full text-xs rounded-xl pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:text-white"
                          />
                        </div>
                      </div>

                      {/* Email Entry */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="mail@domain.com"
                            className="w-full text-xs rounded-xl pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone Entry */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Mobile Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="07123 456789"
                            className="w-full text-xs rounded-xl pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:text-white"
                          />
                        </div>
                      </div>

                      {/* Postcode Entry */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Liverpool Postcode Zone</label>
                        <div className="relative">
                          <MapPin className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                          <input
                            type="text"
                            required
                            value={postcode}
                            onChange={(e) => setPostcode(e.target.value)}
                            placeholder="e.g. L4 0TH"
                            className="w-full text-xs rounded-xl pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:text-white uppercase"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Date selection */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Preferred Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                          <input
                            type="date"
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full text-xs rounded-xl pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:text-white"
                          />
                        </div>
                      </div>

                      {/* Time slot selections */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Target Hours / Availability</label>
                        <select
                          value={timeSlot}
                          onChange={(e) => setTimeSlot(e.target.value)}
                          className="w-full text-xs rounded-xl px-4 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:text-white"
                        >
                          {TIME_SLOTS.map(ts => (
                            <option key={ts.value} value={ts.value}>{ts.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Urgent indicator checkbox */}
                    <div 
                      onClick={() => setUrgent(!urgent)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        urgent 
                          ? 'bg-red-500/10 border-red-500 ring-1 ring-red-500/20' 
                          : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <AlertTriangle className={`h-4.5 w-4.5 ${urgent ? 'text-red-500 animate-pulse' : 'text-slate-450'}`} />
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-white">Household is Vulnerable / Urgent Issue</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-450">Prioritizes assignments and signals field team.</p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={urgent}
                        readOnly
                        className="accent-primary-500 h-4.5 w-4.5 outline-none pointer-events-none"
                      />
                    </div>

                    {/* Submission Booking Details CTA */}
                    <motion.button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-bold text-sm py-4 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <span>Finalize & Reserve Appointment</span>
                      <ChevronRight className="h-4.5 w-4.5" />
                    </motion.button>

                  </form>
                </motion.div>
              )}

              {/* Step 2: Submitting Screen */}
              {step === 2 && (
                <motion.div
                  key="form-loading"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-16 text-center space-y-6 flex flex-col items-center justify-center"
                >
                  <div className="relative">
                    <span className="absolute top-0 left-0 w-20 h-20 bg-blue-500/10 rounded-full animate-ping"></span>
                    <div className="relative bg-gradient-to-tr from-secondary-600 to-primary-600 text-white p-5 rounded-full shadow-lg">
                      <Clock className="h-9 w-9 animate-spin" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-display font-black text-xl text-slate-950 dark:text-white">
                      Assembling Repair Ticket...
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                      Saving parameters, locks, prefilled scopes, and reserving local plumber. One moment...
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Success Voucher Receipt */}
              {step === 3 && bookingTicket && (
                <motion.div
                  key="receipt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center pb-5 border-b border-slate-100 dark:border-slate-850">
                    <div className="inline-flex bg-emerald-500/10 text-emerald-500 p-3.5 rounded-full border border-emerald-500/20 mb-3.5">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-slate-905 dark:text-white">
                      Reservation Confirmed!
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                      A confirmation ticket with job details has been secured and dispatched internally.
                    </p>
                  </div>

                  {/* Receipt Voucher Panel */}
                  <div className="relative p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 overflow-hidden text-xs">
                    {/* Left/Right punch holes decorations */}
                    <div className="absolute top-1/2 -left-3 h-6 w-6 rounded-full bg-white dark:bg-slate-950 transform -translate-y-1/2 border-r border-slate-300 dark:border-slate-800"></div>
                    <div className="absolute top-1/2 -right-3 h-6 w-6 rounded-full bg-white dark:bg-slate-950 transform -translate-y-1/2 border-l border-slate-300 dark:border-slate-800"></div>

                    <div className="space-y-3.5">
                      
                      {/* Ticket No */}
                      <div className="flex items-center justify-between pb-2.5 border-b border-dashed border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] font-bold text-slate-450 uppercase font-mono tracking-widest">
                          Receipt ID
                        </span>
                        <span className="font-mono font-black text-[11px] text-secondary-600 dark:text-secondary-400 bg-secondary-500/15 px-2.5 py-1 rounded">
                          {bookingTicket.id}
                        </span>
                      </div>

                      {/* Detail list items */}
                      <div className="grid grid-cols-2 gap-y-3 gap-x-1.5">
                        
                        <div>
                          <p className="text-[10px] uppercase font-mono text-slate-400">Customer Name</p>
                          <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{bookingTicket.customerName}</p>
                        </div>

                        <div>
                          <p className="text-[10px] uppercase font-mono text-slate-400">Postal Zone</p>
                          <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 uppercase">{bookingTicket.postcode}</p>
                        </div>

                        <div>
                          <p className="text-[10px] uppercase font-mono text-slate-400">Scheduled Date</p>
                          <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{bookingTicket.date}</p>
                        </div>

                        <div>
                          <p className="text-[10px] uppercase font-mono text-slate-400">Time-slot Window</p>
                          <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{bookingTicket.timeSlot}</p>
                        </div>

                      </div>

                      {/* Expected ex-VAT range indications */}
                      <div className="pt-2.5 border-t border-dashed border-slate-200 dark:border-slate-800 flex justify-between items-center text-[10px] font-mono font-bold leading-normal">
                        <span className="text-slate-400">MERCYSIDE FLEET GUARANTEE</span>
                        <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded uppercase">
                          No Callout Fees
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* Voucher Action Footers */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleReset}
                      className="flex-1 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 font-bold text-xs py-3.5 rounded-xl transition-all"
                    >
                      Dismiss Portal
                    </button>
                    
                    <a
                      href="mailto:adambinmuhammad661@gmail.com"
                      className="flex-1 text-center bg-secondary-600 hover:bg-secondary-700 text-white font-bold text-xs py-3.5 rounded-xl transition-all flex items-center justify-center space-x-1"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Email Confirmation</span>
                    </a>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
