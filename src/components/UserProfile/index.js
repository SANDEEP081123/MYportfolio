import React from 'react';

/**
 * UserProfile
 * Preserves the original UserProfile image and identity asset
 * Enhanced with futuristic HUD telemetry styling and accessibility attributes.
 */
const UserProfile = ({ className = '' }) => (
  <div className={`relative group ${className}`}>
    <div className="relative rounded-2xl overflow-hidden border border-cyan-500/40 bg-slate-950/80 shadow-[0_0_25px_rgba(0,240,255,0.2)]">
      <img
        src="https://gcp-na-images.contentstack.com/v3/assets/bltea6093859af6183b/blt8b58d754b919eed3/69877da506f2c14fb9333d07/10-2015-488-gtb.jpg?branch=production&width=750&quality=75&auto=webp&crop=3:2"
        alt="Sandeep Nelapogula - Ferrari 488 GTB High Performance Engineering"
        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] text-cyan-300">
        <span>FERRARI 488 GTB // TELEMETRY</span>
        <span className="text-violet-400">ACTIVE</span>
      </div>
    </div>
  </div>
);

export default UserProfile;
