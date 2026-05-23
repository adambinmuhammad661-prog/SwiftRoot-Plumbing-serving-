import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote, Plus, CheckCircle2, MapPin, MessageSquare, Award } from 'lucide-react';
import { Review } from '../types';

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev_1',
    name: 'Harrison Davies',
    location: 'Anfield (L4), Liverpool',
    rating: 5,
    text: 'A critical emergency! SwiftRoot dispatched Dave who arrived in exactly 15 minutes. He was incredibly courteous, had all the high-pressure tools in his van, isolated the pipe leak within 4 minutes, and solved it. Outstanding local service!',
    date: '3 days ago',
    verified: true,
    service: 'Burst Pipe Emergency'
  },
  {
    id: 'rev_2',
    name: 'Emily Rose',
    location: 'Crosby (L23), Sefton',
    rating: 5,
    text: 'I booked a regular appointment to fit a modern thermostatic shower mixer. Very reasonable price estimated on their website slider slider. Professional, clean, and checked up after completion. Best plumber in Liverpool!',
    date: '1 week ago',
    verified: true,
    service: 'Shower Mixer Fit'
  },
  {
    id: 'rev_3',
    name: 'George Henderson',
    location: 'Speke (L24), Garston',
    rating: 5,
    text: 'Extremely polite engineers. They resolved our blocked sewer drains and did high-pressure commercial water jetting. Cleaned up everything afterwards. Price was transparent and they showed there cards and Gas Safe ID on entry.',
    date: '2 weeks ago',
    verified: true,
    service: 'Drain Unblocking'
  },
  {
    id: 'rev_4',
    name: 'Sarah Jenkins',
    location: 'Woolton (L25), Liverpool',
    rating: 4,
    text: 'Our central heating radiators were freezing at the bottom. The team flushed the system and cleared years of magnetic black sludges. It is working perfectly now, very happy with the results. Thank you SwiftRoot plumbing!',
    date: '3 weeks ago',
    verified: true,
    service: 'Radiator Power Flush'
  }
];

export default function ReviewsCarousel() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('Liverpool City Centre');
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');
  const [newService, setNewService] = useState('Burst Pipe Repair');

  const [formSubmitted, setFormSubmitted] = useState(false);

  // Auto scroll carousel (disabled when form is open, or on manual interaction)
  useEffect(() => {
    if (showAddForm) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [reviews.length, showAddForm]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newText) return;

    const newRevObj: Review = {
      id: 'rev_' + Date.now(),
      name: newName,
      location: newLocation + ', Liverpool',
      rating: newRating,
      text: newText,
      date: 'Just now',
      verified: true,
      service: newService
    };

    setReviews([newRevObj, ...reviews]);
    setCurrentIndex(0);
    setFormSubmitted(true);

    setTimeout(() => {
      setNewName('');
      setNewText('');
      setNewRating(5);
      setShowAddForm(false);
      setFormSubmitted(false);
    }, 2000);
  };

  const activeReview = reviews[currentIndex];
  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section id="reviews" className="py-24 bg-slate-50 dark:bg-slate-900 border-b border-slate-200/50 dark:border-slate-800/60 px-4 sm:px-6 lg:px-8 relative scroll-mt-20">
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Informational & rating Block */}
          <div className="lg:col-span-4 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500/20" />
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest font-mono">
                Liverpool trust score
              </span>
            </div>
            
            <h2 className="font-display font-black text-3.5xl sm:text-4.5xl text-slate-900 dark:text-white tracking-tight leading-none">
              Highly Rated On Google & Trustpilot
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-450 leading-relaxed font-sans">
              Our commitment is to render premium plumbing work with transparent pricing. We transparently collect reviews from residents across Merseyside.
            </p>

            {/* Average Star rating graphics indicators */}
            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/40 dark:border-slate-800/80 w-fit">
              <div className="text-center shrink-0 pr-4 border-r border-slate-100 dark:border-slate-800/80">
                <h4 className="font-display font-black text-3xl text-slate-950 dark:text-white leading-none">
                  {averageRating}
                </h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5">
                  Avg Rating
                </p>
              </div>
              <div>
                <div className="flex text-amber-500 space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.round(Number(averageRating)) ? 'fill-amber-500' : 'text-slate-300 dark:text-slate-700'}`} 
                    />
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-sans">
                  Based on {reviews.length} total local reviews
                </p>
              </div>
            </div>

            {/* Toggle review contribution button */}
            {!showAddForm && (
              <motion.button
                onClick={() => setShowAddForm(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-tr from-secondary-600 to-primary-600 hover:from-secondary-700 hover:to-primary-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md cursor-pointer"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Plus className="h-4.5 w-4.5" />
                <span>Write a Liverpool Review</span>
              </motion.button>
            )}
          </div>

          {/* Carousel & Contribution Overlay Panel */}
          <div className="lg:col-span-8 relative">
            
            <AnimatePresence mode="wait">
              
              {/* Review browser display panel */}
              {!showAddForm ? (
                <motion.div
                  key="carousel-card"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/80 rounded-[2.5rem] p-6 sm:p-10 shadow-lg relative min-h-[360px] flex flex-col justify-between"
                >
                  {/* Quote decoration */}
                  <div className="absolute top-8 right-8 text-slate-100 dark:text-slate-900 pointer-events-none">
                    <Quote className="h-20 w-20 fill-current opacity-60" />
                  </div>

                  {/* Header metadata */}
                  <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center space-x-2.5">
                      <div className="bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1 rounded-full flex items-center space-x-1 border border-emerald-500/10">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-mono">
                          Verified local Job
                        </span>
                      </div>
                      <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 rounded font-mono">
                        {activeReview.service}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">{activeReview.date}</span>
                  </div>

                  {/* Review Text block */}
                  <div className="py-6 flex-1">
                    <div className="flex text-amber-500 space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4.5 w-4.5 ${i < activeReview.rating ? 'fill-amber-500' : 'text-slate-200 dark:text-slate-800'}`} 
                        />
                      ))}
                    </div>
                    <blockquote className="text-base sm:text-lg text-slate-755 dark:text-slate-200 font-sans italic leading-relaxed font-medium">
                      "{activeReview.text}"
                    </blockquote>
                  </div>

                  {/* Review Footer details */}
                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h4 className="font-display font-black text-sm text-slate-900 dark:text-white">
                        {activeReview.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-455 flex items-center space-x-1 mt-0.5">
                        <MapPin className="h-3.5 w-3.5 text-primary-500" />
                        <span>{activeReview.location}</span>
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <motion.button
                        onClick={handlePrev}
                        className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Previous Review"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                        onClick={handleNext}
                        className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Next Review"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </div>

                </motion.div>
              ) : (
                /* Write a Review Form Panel Overlay */
                <motion.div
                  key="review-form"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/80 rounded-[2.5rem] p-6 sm:p-10 shadow-lg relative min-h-[360px]"
                >
                  <AnimatePresence mode="wait">
                    {!formSubmitted ? (
                      <motion.form 
                        key="raw-form"
                        onSubmit={handleAddReviewSubmit}
                        className="space-y-4"
                        exit={{ opacity: 0 }}
                      >
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80">
                          <h3 className="font-display font-extrabold text-base text-slate-900 dark:text-white flex items-center space-x-2">
                            <MessageSquare className="h-5 w-5 text-primary-500" />
                            <span>Contribute Your Experience</span>
                          </h3>
                          <button
                            type="button"
                            onClick={() => setShowAddForm(false)}
                            className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 border-none bg-transparent cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Your Name</label>
                            <input
                              type="text"
                              required
                              value={newName}
                              onChange={(e) => setNewName(e.target.value)}
                              placeholder="Margaret Miller"
                              className="w-full text-xs rounded-lg p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:text-white"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Liverpool Ward / Area</label>
                            <select
                              value={newLocation}
                              onChange={(e) => setNewLocation(e.target.value)}
                              className="w-full text-xs rounded-lg p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:text-white"
                            >
                              <option value="Liverpool City Centre">City Centre</option>
                              <option value="Anfield">Anfield</option>
                              <option value="Crosby">Crosby</option>
                              <option value="Toxteth">Toxteth</option>
                              <option value="Woolton">Woolton</option>
                              <option value="Speke">Speke</option>
                              <option value="Bootle">Bootle</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Service Executed</label>
                            <input
                              type="text"
                              required
                              value={newService}
                              onChange={(e) => setNewService(e.target.value)}
                              placeholder="e.g. Toilet Unblocking"
                              className="w-full text-xs rounded-lg p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:text-white"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block">Review Rating</label>
                            <div className="flex text-amber-500 space-x-1 pt-1.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  type="button"
                                  key={star}
                                  onClick={() => setNewRating(star)}
                                  className="border-none bg-transparent cursor-pointer"
                                >
                                  <Star className={`h-5 w-5 ${star <= newRating ? 'fill-amber-500' : 'text-slate-200 dark:text-slate-800'}`} />
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Write Your Feedback</label>
                          <textarea
                            required
                            rows={3}
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                            placeholder="Describe SwiftRoot plumbing engineers performance, price transparency, speed..."
                            className="w-full text-xs rounded-lg p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:text-white resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-secondary-600 hover:bg-secondary-700 text-white font-bold text-xs py-3 rounded-xl shadow-md cursor-pointer"
                        >
                          Submit Verification Feedback
                        </button>
                      </motion.form>
                    ) : (
                      /* Success prompt overlay */
                      <motion.div 
                        key="form-success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-16 text-center space-y-4"
                      >
                        <div className="inline-flex bg-emerald-500/10 text-emerald-500 p-4 rounded-full border border-emerald-500/20">
                          <CheckCircle2 className="h-8 w-8" />
                        </div>
                        <div>
                          <h4 className="font-display font-extrabold text-lg text-slate-900 dark:text-white">
                            Review Forwarded for Verification!
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                            Thank you and we appreciate your support. Your feedback has been dynamically added to our system.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

            </AnimatePresence>

          </div>

        </div>
      </div>

    </section>
  );
}
