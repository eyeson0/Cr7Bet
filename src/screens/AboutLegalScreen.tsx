import React, { useState } from 'react';
import {
  ShieldCheck,
  Mail,
  HelpCircle,
  CheckCircle2,
  Lock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const AboutLegalScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'about' | 'policy' | 'support'>('about');

  // Contact support form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Feedback');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // FAQ open/close state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
    }, 500);
  };

  const faqs = [
    {
      q: 'Can I deposit money or win cash prizes on CR7BET?',
      a: 'No. CR7BET is strictly an informational and fan entertainment application. All prediction points (Fan XP) have zero monetary value, cannot be purchased, deposited, or withdrawn, and cannot be exchanged for cash or physical rewards.',
    },
    {
      q: 'How are live scores and fixtures refreshed?',
      a: 'The application runs a clean modular data service layer. In demonstration mode, an in-memory live simulation engine advances match clocks and generates tactical events. An authorized sports API (such as Sportradar or API-Football) can be connected by implementing the documented API adapter.',
    },
    {
      q: 'Where are my favourites and prediction streaks saved?',
      a: 'All preferences, starred teams, settings, and prediction history are securely stored in your browser’s local storage (localStorage) without third-party tracking cookies.',
    },
    {
      q: 'Is CR7BET affiliated with Cristiano Ronaldo or any commercial betting entity?',
      a: 'No. CR7BET is an independent original working project name. It does not use Cristiano Ronaldo’s image, likeness, trademarks, or proprietary logos, nor is it affiliated with any gambling operator.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Title */}
      <div>
        <h1 className="font-display font-extrabold text-2xl text-white">
          About & Community Support
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Platform transparency, responsible sports engagement, and contact channels.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'about', label: 'About CR7BET' },
          { id: 'policy', label: 'Non-Gambling & Privacy Policy' },
          { id: 'support', label: 'Support & FAQ' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as typeof activeTab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === t.id
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900/80 text-slate-400 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: ABOUT */}
      {activeTab === 'about' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#090e1f] border border-amber-500/30 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-slate-950 font-display text-base">
                CR7
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-white">
                  CR7BET Sports Intelligence & Prediction Arena
                </h2>
                <span className="text-xs text-slate-400">
                  Version 2.4.0 · Modern Responsive & Mobile Experience
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              CR7BET is engineered as a state-of-the-art sports information platform designed for
              fans, tactical analysts, and fantasy sports enthusiasts. Built with a high-performance
              modular architecture, the app provides instant score feeds, in-depth player lineups,
              head-to-head statistics, and an engaging prediction leaderboard.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <h4 className="text-xs font-bold text-amber-400 mb-1">Multi-Sport Feed</h4>
                <p className="text-[11px] text-slate-400">
                  Football, Cricket, Basketball, and Tennis fixtures curated with real-time stats.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <h4 className="text-xs font-bold text-amber-400 mb-1">Zero Real-Money Risk</h4>
                <p className="text-[11px] text-slate-400">
                  100% non-monetary competition. Test intuition and sports IQ without financial exposure.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <h4 className="text-xs font-bold text-amber-400 mb-1">Local & Private</h4>
                <p className="text-[11px] text-slate-400">
                  Fast client-side persistence with instant reactivity across all viewports.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: NON-GAMBLING POLICY & PRIVACY */}
      {activeTab === 'policy' && (
        <div className="space-y-6">
          {/* Non-Gambling Charter */}
          <div className="p-6 rounded-2xl bg-[#090e1f] border border-amber-500/30 space-y-3">
            <div className="flex items-center gap-2 text-amber-400">
              <ShieldCheck className="w-5 h-5" />
              <h2 className="font-display font-bold text-base text-white">
                Official Non-Gambling & Social Sports Disclaimer
              </h2>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              CR7BET does not operate, offer, or facilitate real-money wagering, bookmaking, sports betting,
              or gambling activities of any description. All points, ratings, and multipliers displayed
              in connection with predictions are strictly virtual, recreational &ldquo;Fan XP&rdquo;
              having zero cash value.
            </p>
            <ul className="list-disc pl-5 text-xs text-slate-400 space-y-1">
              <li>No deposits of currency (fiat or cryptocurrency) are supported or accepted.</li>
              <li>No prize draws, cash redemptions, or monetary conversions are possible.</li>
              <li>Odds ratios reflect statistical fan consensus and carry no commercial staking value.</li>
            </ul>
          </div>

          {/* Privacy Policy */}
          <div className="p-6 rounded-2xl bg-[#090e1f] border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-slate-200">
              <Lock className="w-5 h-5 text-amber-400" />
              <h2 className="font-display font-bold text-base text-white">
                Privacy & Data Storage Policy
              </h2>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              We respect your digital privacy. CR7BET operates without tracking cookies, telemetric
              trackers, or unnecessary third-party profiling.
            </p>
            <div className="text-xs text-slate-400 space-y-2">
              <p>
                <strong>Local Storage Usage:</strong> Your favorite clubs, selected odds formats,
                notification preferences, and active prediction slips are saved locally on your
                device via the browser’s standard Web Storage API.
              </p>
              <p>
                <strong>Data Deletion:</strong> You have full control over your local records. You can
                erase all stored profile data at any time via the Settings screen.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SUPPORT & FAQ */}
      {activeTab === 'support' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* FAQ Accordion */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-base text-white mb-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>Frequently Asked Questions</span>
            </h2>

            <div className="space-y-2">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-800 bg-[#090e1f] overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-3.5 text-left flex items-center justify-between text-xs font-semibold text-slate-200 hover:text-white"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="p-3.5 pt-0 text-xs text-slate-400 border-t border-slate-800/60 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Support Form */}
          <div className="p-5 rounded-2xl bg-[#090e1f] border border-slate-800">
            <h2 className="font-display font-bold text-base text-white mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400" />
              <span>Send Fan Feedback & Inquiries</span>
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Have a suggestion for a new sports league or want to report an issue? Send us a ticket.
            </p>

            {submitted ? (
              <div className="p-5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-200">Ticket Dispatched!</h4>
                <p className="text-xs text-emerald-300/80">
                  Thank you for your feedback. Our sports technical team will review your submission.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-3 py-1.5 bg-slate-900 border border-slate-700 text-xs rounded-lg text-slate-300"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Martinez"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Topic Category
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Feedback">Feature Request / Feedback</option>
                    <option value="Scores">Score or Stats Inaccuracy</option>
                    <option value="Predictions">Predictions & XP Leaderboard</option>
                    <option value="API">Sports Data API Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your inquiry or suggestions..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs transition-transform active:scale-95 shadow-md shadow-amber-500/10"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
