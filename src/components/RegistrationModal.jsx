import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle2, ArrowUpRight, Copy, Check, Sparkles, Send } from 'lucide-react';
import { FESTIVAL_CONFIG } from '../config';
import { soundManager } from '../utils/audio';

export default function RegistrationModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', event: 'robo-wars' });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(FESTIVAL_CONFIG.registrationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    soundManager.playSystemBoot();
    setSubmitted(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg rounded-2xl bg-[#142037] border border-[#00F0FF]/50 shadow-[0_0_50px_rgba(0,240,255,0.3)] p-6 sm:p-8 overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-lg bg-[#1E2D4A] text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 transition-colors"
          aria-label="Close registration dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#1E2E4E] border border-[#00F0FF]/40 text-[#00F0FF] font-tech text-[11px] tracking-wider uppercase font-semibold">
            <Sparkles className="w-3 h-3" />
            <span>ROBOFEST 2026 // ADMISSION PROTOCOL</span>
          </div>

          <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
            REGISTER YOUR SQUAD
          </h3>
        </div>

        {!submitted ? (
          <div className="mt-6 space-y-6">
            {/* Transparent Note regarding registration status */}
            <div className="p-3.5 rounded-xl bg-[#1A2846] border border-amber-500/30 text-xs text-amber-200 flex gap-3">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold">Registration Status Notice</p>
                <p className="text-[11px] text-slate-200">
                  Official registration links and dates will be announced by ROBOTiX Club, NIT Raipur. Below is the configured placeholder endpoint:
                </p>
              </div>
            </div>

            {/* Configured Endpoint Display */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-tech text-slate-300 font-semibold">
                <span>CONFIGURED URL:</span>
                <span className="text-[#00F0FF]">src/config.js</span>
              </div>
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-[#0F172A] border border-slate-700 font-mono text-xs text-slate-200">
                <span className="truncate">{FESTIVAL_CONFIG.registrationUrl}</span>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="p-1.5 hover:text-[#00F0FF] text-slate-300 transition-colors"
                  title="Copy link"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Quick Pre-Registration Interest Form (Frontend Demonstration) */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="text-xs font-tech text-slate-300 uppercase tracking-wider font-semibold">
                // PRE-REGISTER INTEREST (DEMO)
              </div>

              <div>
                <input
                  type="text"
                  required
                  placeholder="Team Lead / Participant Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#1A2846] border border-slate-600 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#00F0FF] transition-colors"
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  placeholder="Institute / College Email (@nitrr.ac.in or college)"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#1A2846] border border-slate-600 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#00F0FF] transition-colors"
                />
              </div>

              <div>
                <select
                  value={formData.event}
                  onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#1A2846] border border-slate-600 text-sm text-white focus:outline-none focus:border-[#00F0FF] transition-colors"
                >
                  <option value="robo-wars">Event 01: Robo Wars (Combat)</option>
                  <option value="robo-race">Event 02: Robo Race (High-Speed Track)</option>
                  <option value="ai-challenge">Event 03: AI Challenge (Intelligent Systems)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#0284C7] text-[#0B1120] font-display font-black text-xs tracking-wider uppercase hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all"
              >
                <span>TRANSMIT INTEREST TELEMETRY</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="mt-6 py-6 text-center space-y-4 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-[#00F0FF]/20 border border-[#00F0FF] text-[#00F0FF] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(0,240,255,0.4)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h4 className="font-display font-bold text-xl text-white">
              INTEREST LOGGED // PASS TICKET GENERATED
            </h4>

            <p className="text-xs font-tech text-slate-200 max-w-sm mx-auto leading-relaxed">
              Acknowledged, <strong>{formData.name}</strong>. Your telemetry beacon has been pinned to the ROBOFEST 2026 pre-registration queue.
            </p>

            <div className="p-3 rounded-lg bg-[#0F172A] border border-slate-700 font-mono text-xs text-slate-300">
              DISPATCH_NODE: NITRR-RF-CONFIRMED-DEMO
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-tech text-xs tracking-wider uppercase transition-colors"
            >
              CLOSE WINDOW
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
