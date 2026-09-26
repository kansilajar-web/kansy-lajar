import React from 'react';
import { SatpolPPLembataLogo } from './SatpolPPLogo';

export const PrintHeader: React.FC = () => {
  return (
    <div className="print-only mb-6 border-b-4 border-double border-slate-900 pb-4">
      <div className="flex items-center justify-between gap-4">
        <SatpolPPLembataLogo size={84} />
        <div className="text-center flex-1">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 leading-tight">
            PEMERINTAH KABUPATEN LEMBATA
          </h2>
          <h1 className="text-lg font-black uppercase tracking-wide text-slate-950 leading-tight">
            SATUAN POLISI PAMONG PRAJA
          </h1>
          <p className="text-xs font-bold text-slate-800 uppercase">
            BIDANG KETENTERAMAN DAN KETERTIBAN UMUM (TRANTIBUM) · DOKUBAKU
          </p>
          <p className="text-[11px] text-slate-600 mt-0.5">
            Jalan Trans Lembata, Lewoleba - Kabupaten Lembata, Provinsi Nusa Tenggara Timur
          </p>
          <p className="text-[10px] text-slate-500">
            DOKUBAKU (Dokumentasi dan Pelaporan Baku Jaga Trantibum) | Email: satpolpp@lembatakab.go.id
          </p>
        </div>
        <SatpolPPLembataLogo size={84} />
      </div>
    </div>
  );
};
