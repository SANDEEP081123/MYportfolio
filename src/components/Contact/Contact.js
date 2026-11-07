import React, { useState } from 'react';
import { soundFx } from '../../utils/audio';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [terminalLogs, setTerminalLogs] = useState([
    'INIT_TRANSMISSION_NODE // READY',
    'AWAITING_INPUT_PACKETS...',
    'NODE_LOCATION: HYDERABAD, INDIA',
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    soundFx.playClick();
    setIsSubmitting(true);

    setTerminalLogs((prev) => [
      ...prev,
      `ENCRYPTING_PAYLOAD: [${formData.name || 'ANON_USER'}]`,
      'RESOLVING_GATEWAY: sandeepnelapogula03@gmail.com...',
    ]);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      soundFx.playPulse();
      setTerminalLogs((prev) => [
        ...prev,
        'DISPATCH_SUCCESS: 200 OK // TRANSMISSION LOGGED',
        'STATUS: ACKNOWLEDGED BY SANDEEP NELAPOGULA',
      ]);
    }, 1200);
  };

  return (
    <section id="contact" className="relative min-h-screen py-24 px-6 z-20">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">
              {'// SECTION 06'}
            </span>
            <div className="h-[1px] w-12 bg-cyan-500/40" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-white tracking-wide uppercase">
            ESTABLISH <span className="text-cyan-400">TRANSMISSION</span>
          </h2>
          <p className="font-mono text-xs text-slate-400 mt-2 max-w-xl">
            [ SECURE DISPATCH PROTOCOL // CONNECT DIRECTLY WITH SANDEEP NELAPOGULA ]
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Terminal Telemetry & Direct Connections */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Interactive Terminal Box */}
            <div className="rounded-2xl border border-cyan-500/30 bg-slate-950/90 backdrop-blur-xl p-5 shadow-[0_0_30px_rgba(0,0,0,0.8)] font-mono">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-[11px] text-slate-400">
                <span className="text-cyan-400 font-bold">TERMINAL // STDIN</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300 min-h-[140px] max-h-[220px] overflow-y-auto">
                {terminalLogs.map((log, i) => (
                  <div key={i} className="flex gap-2 text-cyan-300/90">
                    <span className="text-slate-600">&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
                {isSubmitting && (
                  <div className="text-violet-400 animate-pulse flex gap-2">
                    <span className="text-slate-600">&gt;</span>
                    <span>TRANSMITTING_PACKETS...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Direct Channel Cards */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 backdrop-blur-xl p-6 flex flex-col gap-3">
              <h3 className="font-orbitron font-bold text-sm text-white uppercase tracking-wider mb-1">
                VERIFIED COMM CHANNELS
              </h3>

              {/* Email */}
              <a
                href="mailto:sandeepnelapogula03@gmail.com"
                onMouseEnter={() => soundFx.playHover()}
                onClick={() => soundFx.playClick()}
                className="group flex items-center gap-3.5 p-3 rounded-xl border border-slate-800/80 bg-black/40 hover:border-cyan-400/50 hover:bg-cyan-950/20 transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
                  ✉
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400">EMAIL INBOX</div>
                  <div className="text-xs font-mono text-slate-200 group-hover:text-cyan-300 transition-colors">
                    sandeepnelapogula03@gmail.com
                  </div>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/sandeep-nelapogula"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundFx.playHover()}
                onClick={() => soundFx.playClick()}
                className="group flex items-center gap-3.5 p-3 rounded-xl border border-slate-800/80 bg-black/40 hover:border-sky-400/50 hover:bg-sky-950/20 transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-sky-950/40 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold">
                  in
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400">LINKEDIN PROFILE</div>
                  <div className="text-xs font-mono text-slate-200 group-hover:text-sky-300 transition-colors">
                    linkedin.com/in/sandeep-nelapogula
                  </div>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/SANDEEP081123"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundFx.playHover()}
                onClick={() => soundFx.playClick()}
                className="group flex items-center gap-3.5 p-3 rounded-xl border border-slate-800/80 bg-black/40 hover:border-violet-400/50 hover:bg-violet-950/20 transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-violet-950/40 border border-violet-500/30 flex items-center justify-center text-violet-400 font-bold">
                  ⚡
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400">GITHUB REPOSITORY</div>
                  <div className="text-xs font-mono text-slate-200 group-hover:text-violet-300 transition-colors">
                    github.com/SANDEEP081123
                  </div>
                </div>
              </a>

              {/* Location Badge */}
              <div className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-900 bg-black/30 font-mono text-xs text-slate-400">
                <span className="text-cyan-400">📍</span>
                <span>HYDERABAD, TELANGANA, INDIA</span>
              </div>
            </div>
          </div>

          {/* Right: Interactive Cyber Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-cyan-500/30 bg-slate-950/80 backdrop-blur-xl p-6 sm:p-8 shadow-[0_0_35px_rgba(0,0,0,0.8)] relative">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs text-slate-400 mb-1.5 uppercase">
                      NAME / IDENTIFIER
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Elena Fisher"
                      className="w-full px-4 py-3 rounded-xl font-mono text-sm bg-black/60 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-slate-400 mb-1.5 uppercase">
                      RETURN FREQUENCY (EMAIL)
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. elena@nexus.dev"
                      className="w-full px-4 py-3 rounded-xl font-mono text-sm bg-black/60 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs text-slate-400 mb-1.5 uppercase">
                    TRANSMISSION TOPIC
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Collaboration / Full-Stack Architecture / WebGL"
                    className="w-full px-4 py-3 rounded-xl font-mono text-sm bg-black/60 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-slate-400 mb-1.5 uppercase">
                    DATA PAYLOAD (MESSAGE)
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Detail your inquiry or collaboration proposal..."
                    className="w-full px-4 py-3 rounded-xl font-mono text-sm bg-black/60 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={() => soundFx.playHover()}
                  className="w-full py-3.5 px-6 rounded-xl font-orbitron font-bold text-xs tracking-widest uppercase text-slate-900 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.7)] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>ENCRYPTING &amp; DISPATCHING...</span>
                  ) : isSuccess ? (
                    <span>TRANSMISSION TRANSMITTED ✓</span>
                  ) : (
                    <span>DISPATCH PACKET →</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Contact);
