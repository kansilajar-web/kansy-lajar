import React from 'react';
import { SatpolPPLembataLogo, PolPPCilikIcon } from './SatpolPPLogo';
import { ShieldCheck, MapPin, Calendar } from 'lucide-react';

export const HeaderBanner: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <header className="relative bg-slate-950 text-white border-b border-slate-800/80 shadow-xs overflow-hidden">
      {/* Subtle modern ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.12),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top micro bar with minimalist aesthetic */}
      <div className="relative z-10 border-b border-white/5 bg-slate-950/60 backdrop-blur-md px-4 sm:px-6 py-1.5 text-[11px] text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-slate-200 tracking-wide">
              PEMERINTAH KABUPATEN LEMBATA
            </span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">PROVINSI NUSA TENGGARA TIMUR</span>
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400/80" />
              <span>{currentDate}</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400/80" />
              <span>Lewoleba, Lembata (WITA)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Agency Banner */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Logo & Agency Identity */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-center sm:text-left">
            {/* Official Logo Satpol PP Lembata */}
            <div className="relative shrink-0 self-center sm:self-start">
              <div className="p-1 sm:p-1.5 rounded-2xl bg-white shadow-xl border border-white/20 flex items-center justify-center transition-transform duration-300 hover:scale-105">
                <SatpolPPLembataLogo size={106} className="sm:w-[110px] sm:h-[110px] w-[90px] h-[90px]" />
              </div>
            </div>

            {/* Typography with DOKUBAKU */}
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-[11px] font-semibold tracking-wider uppercase">
                  <span>Praja Wibawa 1950</span>
                </div>
              </div>

              {/* DOKUBAKU Hero Title & Official Acronym */}
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent font-sans">
                  DOKUBAKU
                </span>
                <span className="text-xs sm:text-sm font-bold text-amber-400/90 tracking-wide uppercase">
                  (Dokumentasi dan Pelaporan Baku Jaga Trantibum)
                </span>
              </div>

              <h1 className="text-sm sm:text-base lg:text-lg font-bold tracking-tight text-white leading-snug uppercase">
                SISTEM DIGITAL DOKUMENTASI DAN PELAPORAN KEGIATAN TRANTIBUM
              </h1>

              <p className="text-xs sm:text-sm font-semibold tracking-wide text-emerald-400 uppercase">
                SATUAN POLISI PAMONG PRAJA KABUPATEN LEMBATA
              </p>

              <p className="text-xs text-slate-300 italic pt-0.5 leading-relaxed">
                “Mewujudkan Dokumentasi dan Pelaporan Kegiatan Trantibum yang Cepat, Teratur, Akurat, dan Mudah Diakses.”
              </p>
            </div>
          </div>

          {/* Pol PP Cilik Mascot - Clean (Tanpa Keterangan) */}
          <div className="shrink-0 flex items-center justify-center p-2 rounded-3xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-md shadow-lg transition-transform hover:scale-105">
            <PolPPCilikIcon size={92} gender="putra" badge={false} />
          </div>

        </div>
      </div>
    </header>
  );
};
