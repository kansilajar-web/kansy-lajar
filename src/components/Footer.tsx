import React from 'react';
import { SatpolPPLembataLogo, PolPPCilikIcon } from './SatpolPPLogo';
import { Phone, Mail, MapPin, Shield, ExternalLink, Heart } from 'lucide-react';
import { MenuType } from '../types';

interface FooterProps {
  onSelectMenu: (menu: MenuType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectMenu }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800/80 no-print relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-at-c from-slate-900/40 to-slate-950 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          
          {/* Col 1: Instansi & Maskot */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-1.5 rounded-2xl bg-white shadow-md flex items-center justify-center hover:scale-105 transition-transform">
                <SatpolPPLembataLogo size={70} />
              </div>
              <PolPPCilikIcon size={70} gender="putra" />
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-xs font-black tracking-wider text-amber-300 uppercase bg-amber-500/15 px-2 py-0.5 rounded-md border border-amber-400/30">
                    DOKUBAKU
                  </span>
                </div>
                <h2 className="text-white font-extrabold text-sm tracking-wide">
                  SATPOL PP KABUPATEN LEMBATA
                </h2>
                <p className="text-amber-400 text-[11px] font-semibold">
                  Bidang Ketenteraman dan Ketertiban Umum (Trantibum)
                </p>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs pr-4 max-w-lg">
              <strong>DOKUBAKU</strong> (Dokumentasi dan Pelaporan Baku Jaga Trantibum) dikembangkan untuk mendukung ketertiban administrasi, kecepatan penyampaian informasi lapangan, dan keakuratan dokumentasi penegakan ketertiban umum di Kabupaten Lembata.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-[11px]">
              <span className="font-bold text-amber-400">Motto:</span>
              <span className="italic">“Tertib Administrasi, Terarah Pelaporan, Lengkap Dokumentasi”</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-3 space-y-2.5">
            <h3 className="text-white font-bold uppercase tracking-wider text-[11px] text-amber-400/90 border-b border-slate-800/80 pb-2">
              Menu Navigasi
            </h3>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'beranda', label: 'Beranda Sistem' },
                { id: 'profil', label: 'Profil Satpol PP Lembata' },
                { id: 'pelaporan', label: 'Formulir Pelaporan Kegiatan' },
                { id: 'dokumentasi', label: 'Galeri Dokumentasi Lapangan' },
                { id: 'rekapitulasi', label: 'Rekapitulasi Google Sheets' },
                { id: 'petunjuk', label: 'Petunjuk Penggunaan & SOP' }
              ].map((item) => (
                <li key={item.id}>
                  <button 
                    onClick={() => onSelectMenu(item.id as MenuType)} 
                    className="hover:text-amber-300 transition-colors cursor-pointer text-slate-400 hover:translate-x-0.5 transform inline-block"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Kantor & Kontak */}
          <div className="md:col-span-3 space-y-2.5">
            <h3 className="text-white font-bold uppercase tracking-wider text-[11px] text-amber-400/90 border-b border-slate-800/80 pb-2">
              Kontak Satuan
            </h3>
            <div className="space-y-2 text-slate-400 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-snug">Jl. Trans Lembata, Lewoleba, Kab. Lembata, NTT</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Posko: (0383) 41234 / 0812-3456-7890</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>satpolpp@lembatakab.go.id</span>
              </div>
              <div className="pt-2 text-[11px] text-slate-500">
                Penyelenggaraan Trantibum di 9 Kecamatan se-Kabupaten Lembata
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} Satuan Polisi Pamong Praja Kabupaten Lembata. Hak Cipta Dilindungi.
          </p>
          <div className="flex items-center gap-2">
            <span>Sistem Digital Trantibum</span>
            <span>·</span>
            <span>Kabupaten Lembata, NTT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
